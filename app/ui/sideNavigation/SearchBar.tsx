'use client'

import React, {useEffect, useState} from 'react';
import {fetchStocks} from "@/db";
import {CSVDetails} from "@/types/types";
import {SearchList} from "@/ui/sideNavigation/SearchList";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<CSVDetails[]>([]);

    useEffect( () => {
        (async () => {
            if (searchTerm && searchTerm.length > 2) {
                const results : CSVDetails[] = await fetchStocks(searchTerm);
                setResults(results);
            } else {
                setResults([]);
            }
        })()

    }, [searchTerm]);


    return (
        <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-full max-w-md">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full mt-8 h-10 pl-4 pr-10 py-2 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500"
                    placeholder="Search eg: infy bse, nifty fut, nifty weekly, gold mcx"
                />
                {searchTerm && <SearchList results={results}/> }
            </div>
        </div>
    );
};

export default SearchBar;
