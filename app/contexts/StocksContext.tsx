'use client'

import {Context, createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {StockUpdate, StockUpdateWithName} from "@/types/websocket";
import {useWatchlist} from "@/contexts/WatchlistContext";
import {getStockDetails} from "@/lib/dashboardService";
import {generateInstrumentKeysString} from "@/lib/utils";
import {StockDetails} from "@/types/types";
import {initializeWebSocket} from "@/lib/marketFeed";
import config from "@/config/config";
import { useAccounts } from "./AccountsContext";

interface StockContextType {
    stockDetailsMap: Map<string, StockUpdateWithName>,
    baseStockMap: Map<string, StockUpdateWithName>
}

export const StocksContext : Context<StockContextType> = createContext<StockContextType>({
    stockDetailsMap: new Map<string, StockUpdateWithName>(),
    baseStockMap: new Map<string, StockUpdateWithName>(),
});

export const useStocks = () => useContext(StocksContext);

export const StocksProvider = ({ children } : { children: ReactNode}) => {

    const wsRef = useRef<WebSocket | null>(null);

    const [stockDetailsMap, setStockDetailsMap] =
        useState<Map<string,StockUpdateWithName>>(new Map<string, StockUpdateWithName>());

    const [baseStockMap, setBaseStockMap] = 
        useState<Map<string, StockUpdateWithName>>(new Map<string, StockUpdateWithName>());

    const { watchlist } = useWatchlist();

    const { loggedInAccounts } = useAccounts();

    async function refreshBaseStockMap( watchlist: string[] ) {
        if(!watchlist || watchlist.length < 1) {
            console.error('Watchlist is undefined in refreshStockDetails')
            return stockDetailsMap;
        }

        if(!loggedInAccounts || loggedInAccounts.length ===0) {
            console.error('No upstox user is logged in.')
            return stockDetailsMap;
        }

        const instrumentKeys : string = generateInstrumentKeysString(watchlist);

        const fetchedStockDetails: StockDetails[]  = await getStockDetails(instrumentKeys);

        const transformedData : StockUpdateWithName[] = fetchedStockDetails.map((stock: StockDetails) : StockUpdateWithName => {
            const changePercentage = stock.change/(stock.price - stock.change) * 100;

            return {
                name:stock.name,
                instrument_key: stock.instrument_key,
                exchange: stock.exchange,
                currentPrice: stock.price,
                change: stock.change,
                changePercentage: changePercentage,
                lower_circuit_limit: stock.lower_circuit_limit,
                upper_circuit_limit: stock.upper_circuit_limit,
            };
        });

        const transformedDataMap : Map<string, StockUpdateWithName> =
            new Map(transformedData
                .map(stock => [stock.instrument_key, stock]));

        setBaseStockMap(transformedDataMap);
        setStockDetailsMap(transformedDataMap);
    };

    useEffect( () => {
        (async() => {
            await refreshBaseStockMap(watchlist);
        })();
    }, [ watchlist ] );

    useEffect(() => {
        if(!stockDetailsMap || stockDetailsMap.size < 1 ) {
            return;
        }
        let websocketUrlHost = 'wss://';
        if(config.NODE_ENV === 'dev') websocketUrlHost = 'ws://'
        
        try {
            wsRef.current = initializeWebSocket(`${websocketUrlHost}${config.BACKEND_BASE_URL}:8080`,
                (update: StockUpdate[]) => {
                    console.log('new update from backend.')
                    setStockDetailsMap((previousStockDetailsMap: Map<string, StockUpdateWithName>): Map<string, StockUpdateWithName> => {

                        const newStockMap = new Map(previousStockDetailsMap);

                        update.forEach((stockUpdate: StockUpdate) => {

                            const stock = stockDetailsMap.get(stockUpdate.instrument_key);
                            console.log('new stock',stock);
                            
                            if (stock !== undefined) {
                                const newItem: StockUpdateWithName = {
                                    name: stock.name, 
                                    upper_circuit_limit: stock.upper_circuit_limit,
                                    lower_circuit_limit: stock.lower_circuit_limit,
                                    ...stockUpdate,
                                };
                                newStockMap.set(stockUpdate.instrument_key, newItem);
                            } else {

                            }
                        });
                        return newStockMap;
                    });
                });


            return () => {
                if (wsRef.current) {
                    wsRef.current.close();
                }
            };
        }
        catch (e) {
            console.error('websocket connection error');
        }
    }, [baseStockMap])

    return (
        <StocksContext.Provider value={{stockDetailsMap, baseStockMap}}>
            {children}
        </StocksContext.Provider>
    )
}