'use client'

import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import {getUpstoxAccounts} from "@/lib/dashboardService";
import {AccountDetails} from "@/types/types";

interface AccountsContextType {
    accountsDetails: AccountDetails[],
    refreshAccountsDetails: () => void,
}
export const AccountsContext = createContext<AccountsContextType>({
    accountsDetails: [],
    refreshAccountsDetails: () => {},  // Function to refresh account details
});

export const useAccounts = () => useContext(AccountsContext);

export const AccountsProvider = ({ children }: { children: ReactNode}) => {
    const [accountsDetails, setAccountsDetails] =
        useState<AccountDetails[]>([]);

    const refreshAccountsDetails = async () => {
        try {
            const accounts = await getUpstoxAccounts(); // Your axios call to fetch accounts
            setAccountsDetails(accounts);
        } catch (error) {
            console.error('Failed to fetch accounts', error);
        }
    };

    useEffect(() => {
        refreshAccountsDetails();
    }, []);

    return (
        <AccountsContext.Provider value={{ accountsDetails, refreshAccountsDetails }}>
            {children}
        </AccountsContext.Provider>
    );
};
