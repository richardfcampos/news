import axios, { AxiosRequestConfig } from 'axios';
import IApiClient from './IApiClient';

class AxiosApiClient implements IApiClient<AxiosRequestConfig> {
  async get<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await axios.get<T>(url, options);
    return response.data;
  }

  async post<T>(url: string, body: unknown, options?: AxiosRequestConfig): Promise<T> {
    const response = await axios.post<T>(url, body, options);
    return response.data;
  }

  async patch<T>(url: string, body: unknown, options?: AxiosRequestConfig): Promise<T> {
    const response = await axios.patch<T>(url, body, options);
    return response.data;
  }

  async put<T>(url: string, body: unknown, options?: AxiosRequestConfig): Promise<T> {
    const response = await axios.put<T>(url, body, options);
    return response.data;
  }

  async delete<T>(url: string, options?: AxiosRequestConfig): Promise<T> {
    const response = await axios.delete<T>(url, options);
    return response.data;
  }
}

export default AxiosApiClient;
