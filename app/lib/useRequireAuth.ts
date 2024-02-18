// lib/useRequireAuth.ts
import { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';

const useRequireAuth = () => {
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (auth.user === null) {
            console.error("user not logged in : useRequireAuth")
            router.push('/auth/login');
        }
    }, [auth, router]);

    return auth.user;
};

export default useRequireAuth;
