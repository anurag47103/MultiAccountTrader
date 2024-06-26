'use client'

import React, { useState } from 'react';
import HoverOverlayStockCard from "./HoverOverlayStockCard";
import {useRouter} from "next/navigation";
import { removeFromWatchlistForUser } from '@/lib/dashboardService';
import { useAuth } from '@/contexts/AuthContext';
import { useWatchlist } from '@/contexts/WatchlistContext';

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
    const { user } = useAuth();
    const { refreshWatchlist } = useWatchlist();

    const buyHandler = async () => {
        router.push(`/dashboard/placeOrders?instrument_key=${symbol}&type=BUY`, {});
    }

    const sellHandler = async () => {
        router.push(`/dashboard/placeOrders?instrument_key=${symbol}&type=SELL`, {});
    }

    const removeHandler = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        if(!user) return;
        removeFromWatchlistForUser(symbol, user.user_id);
        refreshWatchlist();
    }
    return (
        <div
            className={`relative border-b border-gray-200 dark:border-gray-700 px-4 py-2 flex justify-between items-center ${isHovered ? 'z-10' : 'z-0'}`}
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
                {isHovered && <HoverOverlayStockCard buyClickHandler={buyHandler} sellClickHandler={sellHandler} removeHandler={removeHandler}/>}
            </div>
        </div>
    );
});

export default StockCard;
