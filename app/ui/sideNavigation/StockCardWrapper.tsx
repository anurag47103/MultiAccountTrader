'use client'

import React, { useState, useEffect } from 'react';
import StockCard from './StockCard';
import { initializeWebSocket } from '../../lib/marketFeed';
import {StockUpdate, StockUpdateWithName} from '../../types/websocket';
import {useWatchlist} from "@/contexts/WatchlistContext";
import {WatchlistItem} from "@/types/types";
import {useStocks} from "@/contexts/StocksContext";

const StockCardWrapper: React.FC = () => {

    const {stockDetailsMap} = useStocks();
    // const [stockMap, setStockMap] =
    //     useState<Map<string, StockUpdateWithName>>(new Map<string, StockUpdateWithName>());

    // useEffect(() => {
        // setStockMap(stockDetailsMap);
        // try {
        //     const ws = initializeWebSocket('ws://localhost:8080',
        //         (update : StockUpdate[]) => {
        //
        //             setStockMap((previousStockMap : Map<string, StockUpdateWithName>) : Map<string, StockUpdateWithName>  => {
        //
        //                 const newStockMap = new Map(previousStockMap);
        //
        //                 update.forEach((stockUpdate : StockUpdate)=> {
        //                     const stock = stockDetailsMap.get(stockUpdate.instrument_key);
        //
        //                     if(stock !== undefined) {
        //                         const newItem: StockUpdateWithName = {name: stock.name, ...stockUpdate};
        //                         newStockMap.set(stockUpdate.instrument_key, newItem);
        //                     }
        //                     else {
        //                         console.log('new stock undefined')
        //                     }
        //                 });
        //                 return newStockMap;
        //             });
        //         });
        //
        //     return () => {
        //         if (ws) {
        //             ws.close();
        //         }
        //     };
        // }
        // catch (e) {
        //     console.log('websocket connection error');
        // }
    // }, [stockDetailsMap]);

    return (
        <div className="flex-1 custom-scrollbar overflow-auto">
            {[...stockDetailsMap.values()].map(data => (
                <StockCard
                    name={data.name}
                    key={data.instrument_key}
                    symbol={data.instrument_key}
                    exchange={data.exchange}
                    currentPrice={data.currentPrice}
                    change={data.change}
                    changePercentage={data.changePercentage}
                />
            ))}
        </div>
    );
};

export default StockCardWrapper;
