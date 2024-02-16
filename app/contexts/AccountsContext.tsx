'use client'

import React, {createContext, useState, useContext, useEffect, ReactNode} from 'react';
import {getUpstoxAccounts} from "@/lib/dashboardService";
import {AccountDetails} from "@/types/types";

interface AccountsContextType {
    accountsDetails: AccountDetails[],
    loggedInAccounts: AccountDetails[],
    refreshAccountsDetails: () => void,
}
export const AccountsContext = createContext<AccountsContextType>({
    accountsDetails: [],
    loggedInAccounts: [],
    refreshAccountsDetails: () => {}, 
});

export const useAccounts = () => useContext(AccountsContext);

export const AccountsProvider = ({ children }: { children: ReactNode}) => {
    const [accountsDetails, setAccountsDetails] =
        useState<AccountDetails[]>([]);
    
    const [loggedInAccounts, setLoggedInAccounts] = useState<AccountDetails[]>([]);

    const refreshAccountsDetails = async () => {
        try {
            const accounts = await getUpstoxAccounts(); 
            setLoggedInAccounts(accounts.filter((account) => {
                return account.isLoggedIn;
            }))
            setAccountsDetails(accounts);
        } catch (error) {
            console.error('Failed to fetch accounts', error);
        }
    };

    useEffect(() => {
        refreshAccountsDetails();
    }, []);

    return (
        <AccountsContext.Provider value={{ accountsDetails, loggedInAccounts, refreshAccountsDetails }}>
            {children}
        </AccountsContext.Provider>
    );
};
