import React from 'react';
import {AuthProvider} from "@/contexts/AuthContext";
import LoginForm from "@/ui/LoginForm";

export default function LoginPage() {
    return (
        <AuthProvider>
            <LoginForm />
        </AuthProvider>
    )
};
