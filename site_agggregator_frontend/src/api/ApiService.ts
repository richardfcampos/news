import IApiClient from './IApiClient';
import ApiClientFactory from './ApiClienFactory';

class ApiService {
  private apiClient: IApiClient;
  private token: string | null = null;

  constructor() {
    this.apiClient = ApiClientFactory.createApiClient();
  }

  setToken() {
    this.token = localStorage.getItem('aggregator-token');
  }

  private getHeaders() {
    return this.token ? { Authorization: `Bearer ${this.token}` } : {};
  }

  async fetchData<T>(url: string): Promise<T> {
    return this.apiClient.get<T>(url, { headers: this.getHeaders() });
  }

  async postData<T>(url: string, data: unknown): Promise<T> {
    return this.apiClient.post<T>(url, data, { headers: this.getHeaders() });
  }

  async patchData<T>(url: string, data: unknown): Promise<T> {
    return this.apiClient.patch<T>(url, data, { headers: this.getHeaders() });
  }

  async putData<T>(url: string, data: unknown): Promise<T> {
    return this.apiClient.put<T>(url, data, { headers: this.getHeaders() });
  }

  async deleteData<T>(url: string): Promise<T> {
    return this.apiClient.delete<T>(url, { headers: this.getHeaders() });
  }
}

export default ApiService;
