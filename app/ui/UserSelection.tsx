import { useAccounts } from '@/contexts/AccountsContext';
import React, { Dispatch, SetStateAction, useState } from 'react';


const UserList = ({selectedUsers, setSelectedUsers} : {selectedUsers: string[], setSelectedUsers: Dispatch<SetStateAction<string[]>>}) => {

  const { loggedInAccounts } = useAccounts();  

  if(!loggedInAccounts) return <> Error in getting Logged in Users </>;

  const handleCheckboxChange = (aid: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, aid]);
    } else {
      setSelectedUsers([...selectedUsers].filter((userAid) => userAid !== aid));
    }
  };

  return (
    <div className="bg-gray-800 rounded-md shadow-lg p-6 m-4 mt-10 max-w-2xl mx-auto border border-gray-900">
        <h2 className="text-xl font-medium mb-2 text-white">Place Order for</h2>
        <ul className="divide-y divide-gray-700">
        {loggedInAccounts.map((account) => (
            <li key={account.upstoxUserId} className="flex items-center justify-between py-3">
                <span className="text-gray-300">
                    {account.upstoxUsername} ({account.upstoxUserId})
                </span>
                <div className="relative">
                    <input
                        type="checkbox"
                        id={`user-${account.upstoxUserId}`}
                        checked={selectedUsers.includes(account.upstoxUserId)}
                        onChange={(e) => handleCheckboxChange(account.upstoxUserId, e.target.checked)}
                        className="sr-only" // Hide the default checkbox
                    />
                    <label htmlFor={`user-${account.upstoxUserId}`} className={`block w-6 h-6 rounded-md border-2 cursor-pointer ${selectedUsers.includes(account.upstoxUserId) ? 'bg-blue-900 border-blue-700' : 'bg-gray-700 border-gray-600'}`}></label>
                    <svg className={`absolute top-1/2 left-1/2 w-4 h-4 text-white transform -translate-x-1/2 -translate-y-1/2 pointer-events-none ${selectedUsers.includes(account.upstoxUserId) ? '' : 'hidden'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                </div>
            </li>
        ))}
        </ul>
    </div>



  );
};

export default UserList;