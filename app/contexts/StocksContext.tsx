'use client'

import {Context, createContext, ReactNode, useContext, useEffect, useState} from "react";
import {StockUpdateWithName} from "@/types/websocket";
import {useWatchlist} from "@/contexts/WatchlistContext";
import {getStockDetails} from "@/lib/dashboardService";
import {generateInstrumentKeysString} from "@/lib/utils";
import {StockDetails} from "@/types/types";

interface StockContextType {
    stockDetailsMap: Map<string, StockUpdateWithName>,
    refreshStockDetails: () =>  void,
}
export const StocksContext : Context<StockContextType> = createContext<StockContextType>({
    stockDetailsMap: new Map<string, StockUpdateWithName>(),
    refreshStockDetails: () => {}
});

export const useStocks = () => useContext(StocksContext);

export const StocksProvider = ({ children } : { children: ReactNode}) => {

    const [stockDetailsMap, setStockDetailsMap] =
        useState<Map<string,StockUpdateWithName>>(new Map<string, StockUpdateWithName>());

    const { watchlist} = useWatchlist();

    const refreshStockDetails = async () => {
        if(!watchlist || watchlist.length < 1) {
            console.error('Watchlist is undefined in refreshStockDetails')
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
                changePercentage: changePercentage
            };
        });

        const transformedDataMap : Map<string, StockUpdateWithName> =
            new Map(transformedData
                .map(stock => [stock.instrument_key, stock]));

        setStockDetailsMap(transformedDataMap)
    };

    useEffect( () => {
        (async() => {
            await refreshStockDetails();
        })();
    },[watchlist])


    return (
        <StocksContext.Provider value={{stockDetailsMap, refreshStockDetails}}>
            {children}
        </StocksContext.Provider>
    )
}