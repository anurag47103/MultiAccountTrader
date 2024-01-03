'use client'

import React, { useState } from 'react';
import HoverOverlayStockCard from "./HoverOverlayStockCard";

interface StockCardProps {
    symbol: string;
    exchange: string;
    currentPrice: number;
    change: number;
    changePercentage: number;
}

export default function StockCard({
                                      symbol,
                                      exchange,
                                      currentPrice,
                                      change,
                                      changePercentage
                                  }: StockCardProps) {
    const [isHovered, setIsHovered] = useState(false);
    const priceChangeColor = change < 0 ? 'text-red-600' : 'text-green-600';

    return (
        <div
            className="relative bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center max-w-80"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div>
                {/* Updated text color for better visibility in dark mode */}
                <div className="font-bold text-sm text-gray-900 dark:text-gray-100 ">{symbol}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{exchange}</div>
            </div>
            <div className="flex flex-col items-end justify-end">
                {
                    <div>
                        {/* Updated text color for better visibility in dark mode */}
                        <div className="text-lg text-right font-semibold text-gray-900 dark:text-gray-100">
                            {currentPrice.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                        </div>
                        <div className={`text-xs ${priceChangeColor}`}>
                            {change.toFixed(2)} ({changePercentage.toFixed(2)}%)
                        </div>
                    </div>
                }
                {isHovered && <HoverOverlayStockCard />}
            </div>
        </div>
    );
}
