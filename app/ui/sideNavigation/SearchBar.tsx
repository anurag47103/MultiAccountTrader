'use client'
import React, {useEffect, useState} from 'react';
import Fuse from "fuse.js";
interface searchedStockData {
    instrument_key: string;
    name: string;
    exchange: string;
}

const SearchBar = (data : searchedStockData[]) => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<searchedStockData[]>([]);

    useEffect(() => {
        const options = {
            keys: ['name', 'instrument_key'],
            includeScore: true,
        };
        const fuse = new Fuse(data, options);

        if (searchTerm) {
            const result = fuse.search(searchTerm).map(r => r.item);
            setResults(result);
        } else {
            setResults([]);
        }
    }, [searchTerm, data]);

    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full h-10 pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                    placeholder="Search eg: infy bse, nifty fut, nifty weekly, gold mcx"
                />
                {searchTerm && (
                    <div className="absolute top-full mt-1 w-full bg-white shadow-md max-h-60 overflow-y-auto">
                        {/* Components or elements that represent the search results go here */}
                        {/* This will only render when there is some text in the search input */}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchBar;
