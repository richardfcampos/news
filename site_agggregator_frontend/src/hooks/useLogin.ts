import { useState } from 'react';
import ApiService from '../api/ApiService';

interface LoginResponse {
  id: number;
  email: string;
  created_at: string;
  update_at: string;
  name: string;
  token: string;
}

export const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const apiService = new ApiService();

  const login = async (email:string, password:string): Promise<LoginResponse | null> => {
    setLoading(true);
    setError(null);

    try {
      const data: LoginResponse = await apiService.postData<LoginResponse>(`${process.env.NEXT_PUBLIC_API_HOST}/login`, { email, password });
      localStorage.setItem('aggregator-token', data.token);
      setLoading(false);
      return data;
    } catch (err: unknown) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setError(err.message);
      setLoading(false);
      return null;
    }
  };

  return { login, loading, error };
};
