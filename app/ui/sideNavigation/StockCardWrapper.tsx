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
