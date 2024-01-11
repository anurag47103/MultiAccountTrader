// pages/Accounts.tsx or wherever you're using the AccountList component
'use client'
import React, { useState } from 'react';
import AccountList from '@/ui/topNavigation/AccountList';
import {AccountDetails} from "@/types/types";
import {getAuthUrl} from "@/lib/authService";

const AccountsPage: React.FC = () => {
    // Replace this with actual state management logic
    const [accounts, setAccounts] = useState<AccountDetails[]>([
        { username: 'User1', userId: '001' },
        { username: 'User2', userId: '002' },
        // ... more accounts
    ]);

    const handleAddUser = async () => {
        try {
            const url = await getAuthUrl();
            if (url) {
                console.log(url);
                window.open(url)
            } else {
                console.error('Authentication URL could not be retrieved.');
            }
        } catch (error) {
            console.error('Error during upstoxLogin:', error);
        }
    };

    const handleLogout = (userId: string) => {
        // Logic to logout the user, e.g., filter out the user by userId
        setAccounts(prevAccounts => prevAccounts.filter(account => account.userId !== userId));
    };

    return (
        <div>
            <h1>Accounts</h1>
            <AccountList accounts={accounts} onAddUser={handleAddUser} onLogout={handleLogout} />
        </div>
    );
};

export default AccountsPage;
