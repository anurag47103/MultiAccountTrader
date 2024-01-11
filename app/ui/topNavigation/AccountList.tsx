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

const AccountList: React.FC<AccountListProps> = ({ accounts, onAddUser, onLogout }) => {
    return (
        <div>
            <ul>
                {accounts.map(account => (
                    <li key={account.userId} className="flex justify-between items-center p-2 border-b">
                        <span>{account.username} (ID: {account.userId})</span>
                        <button onClick={() => onLogout(account.userId)} className="bg-red-500 text-white px-4 py-2 rounded">
                            Logout
                        </button>
                    </li>
                ))}
            </ul>
            <button onClick={onAddUser} className="bg-blue-500 text-white px-4 py-2 rounded mt-4">
                Add User
            </button>
        </div>
    );
};

export default AccountList;
