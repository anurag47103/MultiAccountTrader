'use client'
import React, { useState } from 'react';
import { loginUser } from "@/lib/authService";
import { useAuth } from "@/lib/AuthContext";

export default function LoginPage() {
    const { login } = useAuth();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        loginUser({ ...formData, login });
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2" />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input type="password" name="password" id="password" value={formData.password} onChange={handleChange} className="mt-1 block w-full border-2 border-gray-300 rounded-md p-2" />
                </div>
                <button type="submit" className="w-full bg-blue-700 text-white rounded-lg font-bold text-lg p-2">Login</button>
            </form>
        </div>
    );
};
