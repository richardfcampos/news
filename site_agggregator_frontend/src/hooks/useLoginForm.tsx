import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '@/hooks/useLogin';

const useLoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, error } = useLogin();
    const router = useRouter();

    useEffect(() => {
        if (typeof window === 'undefined') {
            return;
        }
    }, []);

    async function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        setTimeout(() => {
        }, 1000);
        const result = await login(email, password);

        if (result) {
            await router.push('/articles');
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        loading,
        error
    };
};

export default useLoginForm;
