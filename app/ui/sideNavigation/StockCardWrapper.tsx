'use client'

import React, { useState, useEffect } from 'react';
import StockCard from './StockCard';
import { initializeWebSocket } from '../../lib/marketFeed';
import { StockUpdate } from '../../types/websocket';

const initialStockData = [
    { symbol: 'INDUSINDBK', exchange: 'NSE EQ', currentPrice: 1598.95, change: -11.60, changePercentage: -0.72 },
    { symbol: 'IDFC', exchange: 'NSE EQ', currentPrice: 126.65, change: 1.65, changePercentage: 1.32 },
];

const StockCardWrapper: React.FC = () => {
    const [stockData, setStockData] = useState<StockUpdate[]>(initialStockData);

    useEffect(() => {
        // Initialize WebSocket connection and provide a callback to update state
        try {
            const ws = initializeWebSocket('ws://localhost:8080',
                (update) => {
                    setStockData(update);
                });

            return () => {
                if (ws) {
                    ws.close();
                }
            };
        }
        catch (e) {
            console.log('websocket connection error');
        }

    }, []);

    return (
        <div>
            {
                stockData.map( data=> (
                    <StockCard
                        key={data.symbol}
                        symbol={data.symbol}
                        exchange={data.exchange}
                        currentPrice={data.currentPrice}
                        change={data.change}
                        changePercentage={data.changePercentage}
                    />
                ))
            }
        </div>
    );
};

export default StockCardWrapper;
