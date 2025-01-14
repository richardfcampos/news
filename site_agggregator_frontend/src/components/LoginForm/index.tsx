"use client";

import React from 'react';
import useLoginForm from '@/hooks/useLoginForm';

export const LoginForm = () => {
    const { email, setEmail, password, setPassword, handleSubmit, loading, error } = useLoginForm();

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-lg bg-white p-10 rounded-lg shadow-lg md:max-w-2xl lg:max-w-3xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Welcome Back</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="email" className="block text-base font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="text-black w-full border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-base font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="text-black w-full border-gray-300 rounded-lg p-3 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-3 rounded-lg transition duration-300 disabled:bg-gray-300"
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && (
                        <p className="text-red-500 text-sm text-center mt-4">
                            {error}
                        </p>
                    )}
                </form>
                <p className="text-base text-gray-500 text-center mt-8">
                    Don’t have an account?{' '}
                    <a href="/signup" className="text-blue-500 hover:underline">
                        Sign up here
                    </a>.
                </p>
            </div>
        </div>
    );
};
