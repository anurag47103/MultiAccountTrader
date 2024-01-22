// components/AccountList.tsx

import React, { useState } from 'react';
import {AccountDetails} from "@/types/types";

// Define the type for a single accounts


// The props for the AccountList component could include methods for adding and removing users
interface AccountListProps {
    accounts: AccountDetails[];
    onAddUser: () => void;
    onLogout: (userId: string) => void;
}

const AccountList = ({ accounts , onAddUser, onLogout } : AccountListProps) => {
    if(accounts === undefined) {
        console.log('accounts is undefined')
        return <></>;
    }

    return (
        <div className="dark:bg-gray-700 shadow-xl rounded-lg p-8 overflow-hidden">
            <ul className="divide-y divide-gray-600">
                {accounts.map(account => (
                    <li key={account.upstoxUserId} className="flex justify-between items-center py-4 hover:bg-gray-600 rounded-md transition duration-150 ease-in-out">
                        <span className="text-lg font-medium text-gray-300">{account.upstoxUsername} (ID: {account.upstoxUserId})</span>
                        <button onClick={() => onLogout(account.upstoxUserId)} className="text-sm font-bold bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-full shadow transition duration-150 ease-in-out">
                            Logout
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={onAddUser} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded mt-4 w-full transition duration-150 ease-in-out">
                Add User
            </button>
        </div>
    );


};

export default AccountList;
