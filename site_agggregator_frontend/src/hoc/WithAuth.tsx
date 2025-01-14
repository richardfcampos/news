"use client"

import React, { useEffect, useState, ReactNode, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ApiService from '../api/ApiService';
import Loading from "@/app/loading";

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const apiService = useMemo(() => new ApiService(), []);

  useEffect(() => {
    apiService.setToken();

    const verifyToken = async () => {
      try {
        await apiService.fetchData(`${process.env.NEXT_PUBLIC_API_HOST}/verify-token`);
        setLoading(false);
      } catch (error) {
        router.push('/');
        console.error('Failed to verify token', error);
      }
    };

    verifyToken().then(() =>{});
  }, [router, apiService]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default WithAuth;
