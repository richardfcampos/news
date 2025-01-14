import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import ApiService from '@/api/ApiService';
import { IAxiosError } from '@/api/IAxiosError';
import {useMemo} from "react";
import { getMessageService } from "@/services/MessageServiceFactory";

interface SignupResponse {
    name: string;
    email: string;
    updated_at: string;
    created_at: string;
    id: number;
}

interface SignupFormInputs {
    name: string;
    email: string;
    password: string;
}

interface ValidationError {
    [key: string]: string[];
}

export default function useSignupForm() {
    const { register, handleSubmit, setError, formState: { errors } } = useForm<SignupFormInputs>();
    const router = useRouter();
    const messageService = useMemo(() => getMessageService(), []);

    const onSubmit: SubmitHandler<SignupFormInputs> = async (data) => {
        try {
            const apiService = new ApiService();
            const response = await apiService.postData<SignupResponse>(`${process.env.NEXT_PUBLIC_API_HOST}/sign-up`, data);

            if (response) {
                messageService.success('User feed updated');
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            }
        } catch (error) {
            const axiosError = error as IAxiosError<{ errors: ValidationError }>;

            if (axiosError.response?.data?.errors) {
                const validationErrors = axiosError.response.data.errors;
                Object.keys(validationErrors).forEach((field) => {
                    setError(field as keyof SignupFormInputs, { type: 'manual', message: validationErrors[field][0] });
                });
            } else {
                console.error(error);
                messageService.error('An unexpected error occurred.');
            }
        }
    };

    return {
        register,
        handleSubmit,
        onSubmit,
        errors,
    };
}
