'use client'

import React from 'react';
import AccountList from '@/ui/topNavigation/AccountList';
import InstructionList from '@/ui/InstructionList';

const AccountsPage: React.FC = () => {

    return (
        <div className="dark:text-white py-8 relative flex flex-col justify">
                <h1 className="light:text-gray-800 text-4xl font-bold mb-8 text-center">Accounts</h1>
                <AccountList />
                <InstructionList />
        </div>
    );


};

export default AccountsPage;
