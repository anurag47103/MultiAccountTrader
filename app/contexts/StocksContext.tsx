'use client'

import {Context, createContext, ReactNode, useContext, useEffect, useRef, useState} from "react";
import {StockUpdate, StockUpdateWithName} from "@/types/websocket";
import {useWatchlist} from "@/contexts/WatchlistContext";
import {getStockDetails} from "@/lib/dashboardService";
import {generateInstrumentKeysString} from "@/lib/utils";
import {StockDetails} from "@/types/types";
import {initializeWebSocket} from "@/lib/marketFeed";
import config from "@/config/config";

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

    async function refreshBaseStockMap( watchlist: string[] ) {
        if(!watchlist || watchlist.length < 1) {
            console.error('Watchlist is undefined in refreshStockDetails')
            return stockDetailsMap;
        }

        console.log('watchlist: ' , watchlist);

        const instrumentKeys : string = generateInstrumentKeysString(watchlist);

        const fetchedStockDetails: StockDetails[]  = await getStockDetails(instrumentKeys);

        console.log('stock details: ', fetchedStockDetails);

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

        console.log('setting baseStockMap to : ', transformedDataMap);

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
        try {
            wsRef.current = initializeWebSocket(`ws://localhost:8080`,
                (update: StockUpdate[]) => {

                    setStockDetailsMap((previousStockDetailsMap: Map<string, StockUpdateWithName>): Map<string, StockUpdateWithName> => {

                        const newStockMap = new Map(previousStockDetailsMap);

                        update.forEach((stockUpdate: StockUpdate) => {
                            const stock = stockDetailsMap.get(stockUpdate.instrument_key);

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
                // if (ws) {
                //     ws.close();
                // }
            };
        }
        catch (e) {
            console.log('websocket connection error');
        }
    }, [baseStockMap])

    return (
        <StocksContext.Provider value={{stockDetailsMap, baseStockMap}}>
            {children}
        </StocksContext.Provider>
    )
}