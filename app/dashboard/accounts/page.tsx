// pages/Accounts.tsx or wherever you're using the AccountList component
'use client'
import React from 'react';
import AccountList from '@/ui/topNavigation/AccountList';
import {getAuthUrl} from "@/lib/authService";
import {useAccounts} from "@/contexts/AccountsContext";
import accountList from "@/ui/topNavigation/AccountList";

const AccountsPage: React.FC = () => {

    const { accountsDetails , refreshAccountsDetails } = useAccounts();

    const handleAddUser = async () => {
        try {
            const url = await getAuthUrl();
            if (url) {
                console.log(url);
                window.open(url)
                refreshAccountsDetails();
            } else {
                console.error('Authentication URL could not be retrieved.');
            }
        } catch (error) {
            console.error('Error during upstoxLogin:', error);
        }
    };

    const handleLogout = (userId: string) => {

    };

    return (
        <div>
            <h1>Accounts</h1>
            <AccountList accounts={accountsDetails} onAddUser={handleAddUser} onLogout={handleLogout} />
        </div>
    );
};

export default AccountsPage;
