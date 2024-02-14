'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import {getLocalStorageWithExpiry, setLocalStorageWithExpiry} from "@/lib/utils";
import { UserData } from '@/types/types';

interface AuthContextType {
    user: UserData | null;
    login: (userData: UserData) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserData | null>(null);
    const router = useRouter();

    useEffect(() => {
            const checkSession = () => {
                const sessionUser = getLocalStorageWithExpiry('user');

                if (sessionUser) {
                    setUser(JSON.parse(sessionUser));
                } else {
                    console.log('AuthProvider: User not loggedIn')
                    router.push('/auth/login');
                }
            };

            checkSession();
    }, [router]);

    const login = (userData: UserData) => {
        setUser(userData);
        setLocalStorageWithExpiry('user', JSON.stringify(userData), 24);
        router.push('/dashboard');
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        router.push('/auth/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);