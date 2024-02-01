'use client'

import React, { useState } from 'react';
import {registerUser} from "@/lib/authService";
import Link from 'next/link';
import Snackbar from '@/ui/Snackbar';

interface SnackbarState {
    visible: boolean;
    message: string;
    type: 'success' | 'error';
}

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });

    const [snackbar, setSnackbar] = useState<SnackbarState>(
        { visible: false, message: '', type: 'success' }
        );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const result = await registerUser({ ...formData });
            if (result) {
                setSnackbar({ visible: true, message: 'Register successful!', type: 'success' });
            } else {
                setSnackbar({ visible: true, message: 'Register failed. Please check your credentials.', type: 'error' });
            }
        } catch (error) {
            setSnackbar({ visible: true, message: 'An error occurred during register.', type: 'error' });
        }

        setTimeout(() => setSnackbar({ ...snackbar, visible: false }), 3000);
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
            <form onSubmit={handleSubmit} className="flex-row items-center justify-center max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-white">Name</label>
                    <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-white">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-white">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full text-gray-800 border border-gray-300 rounded-md shadow-sm p-2" />
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white rounded-md p-2 ">Register</button>
                <Link href='/auth/login' className='flex justify-center'>
                    <div className="text-white hover:text-blue-200 text-xl mt-6">Click here to Login</div>
                </Link>
            </form>
            {snackbar.visible && <Snackbar message={snackbar.message} type={snackbar.type} />}
        </div>
    );
};

export default RegisterPage;
