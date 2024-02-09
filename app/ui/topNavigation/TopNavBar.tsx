'use client'
import React, { useState } from 'react';
import Link from 'next/link';

const TopNavBar: React.FC = () => {
    const [activeTab, setActiveTab] = useState<string>("");

    const handleLinkClick = (href: string) => {
        setActiveTab(href);
    };

    return (
        <nav className="dark:text-white p-4 shadow-lg">
            <ul className="flex justify-evenly space-x-4 text-lg">
                {[
                    { href: "/dashboard/placeOrders", label: "Place Orders" },
                    { href: "/dashboard/orders", label: "Orders" },
                    { href: "/dashboard/positions", label: "Positions" },
                    { href: "/dashboard/holdings", label: "Holdings" },
                    { href: "/dashboard/accounts", label: "Accounts" },
                    { href: "/dashboard/funds", label: "Funds" },
                ].map((link) => (
                    <li key={link.href} className={`hover:text-gray-300 ${activeTab === link.href ? 'text-blue-300' : ''}`}>
                        <Link href={link.href}>
                            <span
                                className="transition duration-300 ease-in-out hover:text-blue-500 cursor-pointer"
                                onClick={() => handleLinkClick(link.href)}
                            >
                                {link.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default TopNavBar;
