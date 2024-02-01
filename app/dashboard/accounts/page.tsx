'use client'

import React from 'react';
import AccountList from '@/ui/topNavigation/AccountList';

const AccountsPage: React.FC = () => {

    return (
        <div className="dark:text-white py-8">
                <h1 className="text-4xl font-bold mb-8 text-center">Accounts</h1>
                <AccountList />
        </div>
    );


};

export default AccountsPage;
