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
            if (searchTerm && searchTerm.length > 0) {
                const results : CSVDetails[] = await fetchStocks(searchTerm);
                setResults(results);
            } else {
                setResults([]);
            }
        })()

    }, [searchTerm]);


    return (
        <div className="flex flex-col items-center justify-center mb-3 mx-2">
            <div className="relative w-full max-w-md">
                <div className="m-1 flex items-center border-2 border-gray-200 bg-white dark:bg-searchBarDark rounded-2xl overflow-hidden shadow-sm focus-within:ring">
                    <div className="pl-4">
                        <svg fill="#808080" height="15px" width="15px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 490.4 490.4" xmlSpace="preserve">
                            <g>
                            <path d="M484.1,454.796l-110.5-110.6c29.8-36.3,47.6-82.8,47.6-133.4c0-116.3-94.3-210.6-210.6-210.6S0,94.496,0,210.796
                                s94.3,210.6,210.6,210.6c50.8,0,97.4-18,133.8-48l110.5,110.5c12.9,11.8,25,4.2,29.2,0C492.5,475.596,492.5,463.096,484.1,454.796z
                                M41.1,210.796c0-93.6,75.9-169.5,169.5-169.5s169.6,75.9,169.6,169.5s-75.9,169.5-169.5,169.5S41.1,304.396,41.1,210.796z"/>
                        </g>
                        </svg>
                    </div>

                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 dark:bg-searchBarDark pl-2 pr-10 py-2 rounded-full text-sm dark:text-black focus:outline-none dark:text-focus:outline-none"
                        placeholder="Search "
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path 
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" />
                        </svg>
                        </button>
                    )}
                </div>
                {searchTerm && <SearchList results={results}/>}
            </div>
        </div>


    );
};

export default SearchBar;
