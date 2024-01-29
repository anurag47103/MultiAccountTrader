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
                <div
                    className="flex items-center border-2 border-gray-200 dark:bg-gray-200 rounded-2xl overflow-hidden shadow-sm focus-within:ring">
                    <div className="pl-4">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none"
                             viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M8 6H21M8 12H21M8 18H21M3 6H3.01M3 12H3.01M3 18H3.01"/>
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full h-10 dark:bg-gray-200 pl-2 pr-10 py-2 rounded-full text-sm dark:text-black focus:outline-none dark:text-focus:outline-none"
                        placeholder="Search "
                    />
                    {searchTerm && (
                        <button
                            onClick={() => setSearchTerm('')}
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.707 6.707a1 1 0 011.414-1.414L10 7.586l1.879-1.879a1 1 0 112.828 2.828L12.414 10l1.879 1.879a1 1 0 01-1.414 1.414L10 11.414l-1.879 1.879a1 1 0 01-2.828-2.828L7.586 10 5.707 8.121a1 1 0 010-1.414z"
                                      clipRule="evenodd"/>
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
