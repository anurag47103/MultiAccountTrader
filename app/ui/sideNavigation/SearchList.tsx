import React, {useState} from "react";
import {CSVDetails} from "@/types/types";
import {useWatchlist} from "@/contexts/WatchlistContext";

export const SearchList = ({results}: {results: CSVDetails[]}) => {
    const { watchlist, addToWatchlist, removeFromWatchlist} = useWatchlist();
    const handleAddToWatchlist = async (instrument_key : string) => {
        addToWatchlist(instrument_key)
    }

    const handleRemoveFromWatchlist = async (instrument_key : string) => {
        removeFromWatchlist(instrument_key);
    }
    return (
        <div className="absolute z-10 w-full mt-2 dark:bg-gray-800 shadow-lg max-h-screen overflow-y-auto">
            <div className="max-h-screen overflow-auto">
                {results.map(stock => (
                    <div key={stock.instrument_key} className="flex justify-between items-center p-2 hover
        :bg-gray-100 border-b border-gray-200">
                        <div className="flex-grow">
                                <p className="font-bold text-sm text-gray-900 dark:text-gray-100">{stock.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{stock.exchange}</p>
                            </div>
                            <div>
                                {
                                !watchlist.includes(stock.instrument_key) ? 
                                    <button className="text-green-600 hover:text-green-800 px-3 py-1 rounded" onClick={() => handleAddToWatchlist(stock.instrument_key)}>Add</button>
                                    : 
                                    <button className="text-red-600 hover:text-red-800 px-3 py-1 rounded" onClick={() => handleRemoveFromWatchlist(stock.instrument_key)}>Remove</button> 
                                }
                            </div>
                        </div>
                    ))}
                </div>
        </div>
    )
}