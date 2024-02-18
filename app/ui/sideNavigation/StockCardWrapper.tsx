'use client'

import React from 'react';
import StockCard from './StockCard';
import {useStocks} from "@/contexts/StocksContext";
import { useAccounts } from '@/contexts/AccountsContext';
import NoAccountMessage from '../NoAccountMessage';

const StockCardWrapper: React.FC = () => {

    const {stockDetailsMap} = useStocks();
    const { loggedInAccounts } = useAccounts();

    if(!loggedInAccounts || loggedInAccounts.length === 0) {
        return (
           <NoAccountMessage action="view positions" />
        );
    }

    if(!stockDetailsMap) {
        return (
            <>
                Error in getting stock details.
            </> 
        )
    }

    if(stockDetailsMap.size === 0) {
        return (
            <div className='mx-2 p-2'>
                Add a stock to the watchlist.
            </div>
        )
    }

    return (
        <div className="flex-1 custom-scrollbar overflow-auto">
            {[...stockDetailsMap.values()].map(data => (
                <StockCard
                    name={data.name}
                    key={data.instrument_key}
                    symbol={data.instrument_key}
                    exchange={data.exchange}
                    currentPrice={data.currentPrice}
                    change={data.change}
                    changePercentage={data.changePercentage}
                />
            ))}
        </div>
    );
};

export default StockCardWrapper;
