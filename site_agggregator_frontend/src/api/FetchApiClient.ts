import IApiClient from './IApiClient';

class FetchApiClient implements IApiClient<RequestInit> {
  async get<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, { ...options, method: 'GET' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async post<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async patch<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async put<T>(url: string, body: unknown, options?: RequestInit): Promise<T> {
    const response = await fetch(url, {
      ...options,
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      body: JSON.stringify(body),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }

  async delete<T>(url: string, options?: RequestInit): Promise<T> {
    const response = await fetch(url, { ...options, method: 'DELETE' });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

export default FetchApiClient;
