'use client'
import React, { useState } from 'react';
import { loginUser } from "@/lib/authService";
import {AuthProvider, useAuth} from "@/contexts/AuthContext";
import LoginForm from "@/ui/LoginForm";

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    )
};
