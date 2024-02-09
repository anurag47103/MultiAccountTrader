'use client'

import React, { useState } from 'react';
import HoverOverlayStockCard from "./HoverOverlayStockCard";
import {useRouter} from "next/navigation";

interface StockCardProps {
    name: string;
    symbol: string;
    exchange: string;
    currentPrice: number;
    change: number;
    changePercentage: number;
}

const StockCard = React.memo(function StockCard ({
                                        name,
                                      symbol,
                                      exchange,
                                      currentPrice,
                                      change,
                                      changePercentage
                                  }: StockCardProps) {

    const [isHovered, setIsHovered] = useState(false);
    const priceChangeColor = change < 0 ? 'text-red-500' : 'text-green-500';
    const router = useRouter();

    const buyHandler = async () => {
        router.push(`/dashboard/placeOrders?instrument_key=${symbol}&type='BUY'`, {});
    }

    const sellHandler = async () => {
        router.push(`/dashboard/placeOrder?instrument_key=${symbol}&type='SELL'`);
    }
    return (
        <div
            className="relative border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center"
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
                {isHovered && <HoverOverlayStockCard buyClickHandler={buyHandler} sellClickHandler={sellHandler}/>}
            </div>
        </div>
    );
});

export default StockCard;
