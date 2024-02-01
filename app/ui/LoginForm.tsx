'use client'
import React, { useState } from 'react';
import { loginUser } from "@/lib/authService";
import { useAuth } from "@/contexts/AuthContext";
import Snackbar from './Snackbar';
import Link from 'next/link';

interface SnackbarState {
    visible: boolean;
    message: string;
    type: 'success' | 'error';
}

interface FormData {
    email: string;
    password: string;
  }

export default function LoginForm() {
    const { login } = useAuth();

    const [formData, setFormData] = useState<FormData>({
        email: '',
        password: '',
    });
    const [snackbar, setSnackbar] = useState<SnackbarState>({ visible: false, message: '', type: 'success' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await loginUser({ ...formData, login });
            if (result) {
                setSnackbar({ visible: true, message: 'Login successful!', type: 'success' });
            } else {
                setSnackbar({ visible: true, message: 'Login failed. Please check your credentials.', type: 'error' });
            }
        } catch (error) {
            setSnackbar({ visible: true, message: 'An error occurred during login.', type: 'error' });
        }

        setTimeout(() => setSnackbar({ ...snackbar, visible: false }), 3000);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="flex-row items-center justify-center max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2 text-gray-800" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2 text-gray-800" />
                </div>
                <button type="submit" className="w-full bg-blue-700 text-white rounded-lg font-bold text-lg p-2">Login</button>
                <Link href='/auth/register' className='flex justify-center'>
                    <div className="text-white hover:text-blue-200 text-xl mt-6">Click here to Register</div>
                </Link>
            </form>
            {snackbar.visible && <Snackbar message={snackbar.message} type={snackbar.type} />}
        </div>
    );
};
