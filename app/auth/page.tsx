import React from 'react';
import Link from 'next/link';

export default function AuthPage() {
    return (
        <>
            <Link href="/auth/login" passHref>
                <button className="w-full bg-blue-500 text-white rounded-md p-2">Login</button>
            </Link>
            <Link href="/auth/register" passHref>
                <button className="w-full bg-blue-500 text-white rounded-md p-2">Register</button>
            </Link>
        </>
    );
};
