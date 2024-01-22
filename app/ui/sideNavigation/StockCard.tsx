'use client'

import React, { useState } from 'react';
import HoverOverlayStockCard from "./HoverOverlayStockCard";
import {placeOrder} from "@/lib/dashboardService";

interface StockCardProps {
    name: string;
    symbol: string;
    exchange: string;
    currentPrice: number;
    change: number;
    changePercentage: number;
}

const StockCard = React.memo(({
                                        name,
                                      symbol,
                                      exchange,
                                      currentPrice,
                                      change,
                                      changePercentage
                                  }: StockCardProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const priceChangeColor = change < 0 ? 'text-red-500' : 'text-green-500';

    const buyHandler = async () => {
       const response = await placeOrder(symbol, 1,0,'MARKET','BUY', 0, 'D', true, 0, 'Day','string');
       console.log(response);
    }
    return (
        <div
            className="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                <div className="font-bold text-sm text-gray-900 dark:text-gray-100 ">{name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{exchange}</div>
            </div>
            <div className="flex flex-col items-end justify-end">
                {
                    <div>
                        <div className={`text-lg text-right font-semibold text-gray-900 ${priceChangeColor}`}>
                            {currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </div>
                        <div className={`text-xs ${priceChangeColor}`}>
                            {change.toFixed(2)} ({changePercentage.toFixed(2)}%)
                        </div>
                    </div>
                }
                {isHovered && <HoverOverlayStockCard buyClickHandler={buyHandler}/>}
            </div>
        </div>
    );
});

export default StockCard;
