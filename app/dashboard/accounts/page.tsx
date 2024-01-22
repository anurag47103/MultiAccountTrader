// pages/Accounts.tsx or wherever you're using the AccountList component
'use client'
import React from 'react';
import AccountList from '@/ui/topNavigation/AccountList';
import {getAuthUrl, logoutUpstoxAccount} from "@/lib/authService";
import {useAccounts} from "@/contexts/AccountsContext";
import accountList from "@/ui/topNavigation/AccountList";
import config from "@/config/config";

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

    const handleLogout = async (upstoxUserId: string) => {
        const response = await logoutUpstoxAccount(upstoxUserId);
        refreshAccountsDetails();
        console.log('handle logout', response);
    };

    return (
        <div className="dark:text-white">
            <div className="max-w-4xl mx-auto py-8">
                <h1 className="text-4xl font-bold mb-8">Accounts</h1>
                    <AccountList accounts={accountsDetails} onAddUser={handleAddUser} onLogout={handleLogout} />
            </div>
        </div>
    );


};

export default AccountsPage;
