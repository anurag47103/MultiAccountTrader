'use client'

import React from 'react';
import {getAuthUrl} from "@/lib/authService";
import { useAuth } from '../../lib/AuthContext';

const LoginPage: React.FC = () => {
    const auth = useAuth();
    const handleLogin = async () => {
        try {
            const url = await getAuthUrl();
            if (url) {
                console.log(url);
                window.open(url)
            } else {
                console.error('Authentication URL could not be retrieved.');
            }
        } catch (error) {
            console.error('Error during upstoxLogin:', error);
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>My Stock Broker</h1>
                <button onClick={handleLogin}>
                    Login
                </button>
            </header>
        </div>
    );
};

export default LoginPage;
