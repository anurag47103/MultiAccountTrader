import React from 'react';
import Link from 'next/link';
import {AuthProvider} from "@/contexts/AuthContext";

export default function AuthPage() {
    return (
        <>
            <AuthProvider>
                <Link href="/auth/login" passHref>
                    <button className="w-full bg-blue-500 text-white rounded-md p-2">Login</button>
                </Link>
                <Link href="/auth/register" passHref>
                    <button className="w-full bg-blue-500 text-white rounded-md p-2">Register</button>
                </Link>
            </AuthProvider>
        </>
    );
};
