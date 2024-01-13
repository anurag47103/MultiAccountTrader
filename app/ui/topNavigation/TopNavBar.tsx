// components/TopNavBar.tsx

import React from 'react';
import Link from 'next/link';

const TopNavBar: React.FC = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <ul className="flex justify-center space-x-4">
                <li className="hover:text-gray-300">
                    <Link href="/dashboard/orders">Orders</Link>
                </li>
                <li className="hover:text-gray-300">
                    <Link href="/dashboard/portfolio">Portfolio</Link>
                </li>
                <li className="hover:text-gray-300">
                    <Link href="/dashboard/holdings">Holdings</Link>
                </li>
                <li className="hover:text-gray-300">
                    <Link href="/dashboard/accounts">Accounts</Link>
                </li>
                <li className="hover:text-gray-300">
                    <Link href="/dashboard/funds">Funds</Link>
                </li>
            </ul>
        </nav>
    );
};

export default TopNavBar;
