'use client'

import React, { useState } from 'react';
import { useAccounts } from '@/contexts/AccountsContext';
import { getAuthUrl, logoutUpstoxAccount, removeUpstoxAccount } from '@/lib/authService';
import AddUserPopup from '../AddUserPopup';
import { useAuth } from '@/contexts/AuthContext';
import { addUpstoxUser } from '@/lib/dashboardService';

interface AccountListProps {
    onAddUser: () => void;
    onLogout: (userId: string) => void;
}

const AccountList = () => {

    const { accountsDetails , refreshAccountsDetails } = useAccounts();
    const { user } = useAuth();
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [newUserData, setNewUserData] = useState({ name: '', upstoxId: '', apiKey: '', apiSecret: '' });

    const handleLogin = async (upstoxUserId: string) => {
        try {
            const url = await getAuthUrl(upstoxUserId);
            if (url) {
                console.log(url);
                window.open(url);
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

    const handleAddUser = () => {
        setShowAddUserPopup(true);
    }

    const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(user)
            addUpstoxUser(user.user_id, newUserData.name, newUserData.upstoxId, newUserData.apiKey, newUserData.apiSecret);
        setShowAddUserPopup(false);
        refreshAccountsDetails();
    };

    async function handleDelete(upstoxUserId: string) {
        const response = await removeUpstoxAccount(upstoxUserId);
        console.log('remove upstox account response: ', response);
    }

    return (
        <div className="text-gray-800 dark:bg-gray-800 shadow-2xl rounded-lg p-8 overflow-hidden border border-gray-300 dark:border-gray-700 max-w-2xl mx-auto">
            <ul className="divide-y divide-gray-600">
                {accountsDetails.map(account => (
                    <li key={account.upstoxUserId} className="flex justify-between items-center py-4 hover:bg-gray-300 dark:hover:bg-gray-700 rounded-md transition duration-150 ease-in-out px-3">
                        <span className="text-lg font-medium dark:text-gray-300">{account.upstoxUsername} (ID: {account.upstoxUserId})</span>
                        <div className="ml-auto"></div>
                        {account.isLoggedIn ? 
                            <button onClick={() => handleLogout(account.upstoxUserId)} className="text-sm font-bold bg-customRed hover:bg-red-600 text-white py-2 px-4 rounded-full shadow transition duration-150 ease-in-out">
                                Logout
                            </button> : 
                            <button onClick={() => handleLogin(account.upstoxUserId)} className="text-sm font-bold bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-full shadow transition duration-150 ease-in-out">
                                Login
                            </button>
                        }
                        <button 
                            onClick={() => handleDelete(account.upstoxUserId)}
                            className="text-customRed hover:text-red-800 transition duration-150 ease-in-out mx-5"
                            aria-label="Delete"
                        >
                            <i className="fas fa-trash-alt"></i>
                        </button>
                        
                    </li>
                ))}
            </ul>
            <button onClick={handleAddUser} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded mt-4 w-full transition duration-150 ease-in-out">
                Add User
            </button>

            {showAddUserPopup && (
                <AddUserPopup
                    onClose={() => setShowAddUserPopup(false)}
                    onSubmit={handleUserSubmit}
                    userData={newUserData}
                    onUserDataChange={handleUserDataChange}
                />
            )}
        </div>
    );


};

export default AccountList;
