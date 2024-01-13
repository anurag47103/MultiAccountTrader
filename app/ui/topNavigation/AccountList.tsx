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

    console.log(typeof accounts, Array.isArray(accounts), accounts.toString())
    // accounts.map(account => {
    //     account.upstoxUsername;
    // })
    return (
        <div>
            <ul>
                {accounts.map(account => (
                    <li key={account.upstoxUserId} className="flex justify-between items-center p-2 border-b">
                        <span>{account.upstoxUsername} (ID: {account.upstoxUserId})</span>
                        <button onClick={() => onLogout(account.upstoxUserId)} className="bg-red-500 text-white px-4 py-2 rounded">
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
