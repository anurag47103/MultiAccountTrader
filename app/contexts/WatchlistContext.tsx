'use client'

import React, {ReactNode, useContext, useEffect, useState} from 'react';
import {addToWatchlistForUser, getWatchlistForUser, removeFromWatchlistForUser} from "@/lib/dashboardService";
import {useAuth} from "@/contexts/AuthContext";

interface WatchlistContextType {
    watchlist: string[];
    addToWatchlist: (item: string) => void;
    removeFromWatchlist: (instrument_key: string) => void;
    refreshWatchlist: () => void;
}

const defaultContextValue: WatchlistContextType = {
    watchlist: [],
    addToWatchlist: () => {},
    removeFromWatchlist: () => {},
    refreshWatchlist: () => {},
};

const WatchlistContext = React.createContext<WatchlistContextType>(defaultContextValue);

export const useWatchlist = () => useContext(WatchlistContext);

export const WatchlistProvider = ({ children }: { children: ReactNode }) => {
    const [watchlist, setWatchlist] = useState<string[]>(defaultContextValue.watchlist);
    const { user } = useAuth();

    const refreshWatchlist = async () => {
        if(user) {
            const response = await getWatchlistForUser(user.user_id);
            setWatchlist(response);
        }
        else {
            console.error('User is null in Watchlist Provider')
        }
    };

    useEffect(() => {
        (async () => {
            await refreshWatchlist();
        })();
    }, [user]);

    const addToWatchlist = async (instrument_key: string) => {
        setWatchlist(prev => [...prev, instrument_key]);
        if(user) {
            const response = await addToWatchlistForUser(instrument_key, user.user_id);
        }
    };

    const removeFromWatchlist = async (instrument_key: string) => {
        setWatchlist(prev => prev.filter(item => item !== instrument_key));

        if(user) {
            const response = await removeFromWatchlistForUser(instrument_key, user.user_id);
        }
    };

    return (
        <WatchlistContext.Provider value={{ watchlist, addToWatchlist, removeFromWatchlist, refreshWatchlist}}>
            {children}
        </WatchlistContext.Provider>
    );
};
