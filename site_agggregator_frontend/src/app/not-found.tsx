"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
    const router = useRouter();

    const handleGoHome = async () => {
        await router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
            <p className="text-xl text-gray-600 mb-8">Oops! The page you are looking for does not exist.</p>
            <button
                onClick={handleGoHome}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
                Go Home
            </button>
        </div>
    );
}
