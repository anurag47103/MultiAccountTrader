import React from 'react';
import {AuthProvider, useAuth} from "@/contexts/AuthContext";
import LoginForm from "@/ui/LoginForm";

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    )
};
