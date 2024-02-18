'use client'

import React, { useState } from 'react';
import { useAccounts } from '@/contexts/AccountsContext';
import { getAuthUrl, logoutUpstoxAccount, removeUpstoxAccount } from '@/lib/authService';
import AddUserPopup from '../AddUserPopup';
import { useAuth } from '@/contexts/AuthContext';
import { addUpstoxUser } from '@/lib/dashboardService';
import Snackbar from '../Snackbar';

interface AccountListProps {
    onAddUser: () => void;
    onLogout: (userId: string) => void;
}

interface SnackbarStateProps {
    visible:boolean;
    message:string;
    type: 'success' | 'error';
}

const AccountList = () => {

    const { accountsDetails , refreshAccountsDetails } = useAccounts();
    const { user } = useAuth();
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [newUserData, setNewUserData] = useState({ name: '', upstoxId: '', apiKey: '', apiSecret: '' });
    const [snackbarState, setSnackbarState] = useState<SnackbarStateProps>({visible: false, message: '', type: 'success'});

    const handleLogin = async (upstoxUserId: string) => {
        try {
            const url = await getAuthUrl(upstoxUserId);
            if (url) {
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
    };

    const handleAddUser = () => {
        setShowAddUserPopup(true);
    }

    const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserData({ ...newUserData, [e.target.name]: e.target.value });
    };

    const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(user) {
            const response : boolean = await addUpstoxUser(user.user_id, newUserData.name, newUserData.upstoxId, newUserData.apiKey, newUserData.apiSecret);
            if(response)  setSnackbarState({visible:true, message:'New user added successfully.', type:'success'});
            else setSnackbarState({visible:true, message:'Error in adding a new Upstox user.', type:'error'});
        }
        else setSnackbarState({visible:true, message:'An Error occured while adding a new Upstox user.', type:'error'});

        setTimeout(() => setSnackbarState({ ...snackbarState, visible: false }), 3000);

        setShowAddUserPopup(false);
        await refreshAccountsDetails();
    };

    async function handleDelete(upstoxUserId: string) {
        const response = await removeUpstoxAccount(upstoxUserId);
        refreshAccountsDetails();
    }

    return (
        <div className="text-gray-800 dark:bg-gray-800 shadow-2xl rounded-lg p-8 overflow-hidden border border-gray-300 dark:border-gray-700 mx-auto w-full md:max-w-4xl">

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

            {snackbarState.visible && <Snackbar message={snackbarState.message} type={snackbarState.type} />}
        </div>
    );


};

export default AccountList;
