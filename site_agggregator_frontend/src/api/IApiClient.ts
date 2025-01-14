export default interface IApiClient<RequestConfig = unknown> {
  get<T>(url: string, options?: RequestConfig): Promise<T>;
  post<T>(url: string, body: unknown, options?: RequestConfig): Promise<T>;
  patch<T>(url: string, body: unknown, options?: RequestConfig): Promise<T>;
  put<T>(url: string, body: unknown, options?: RequestConfig): Promise<T>;
  delete<T>(url: string, options?: RequestConfig): Promise<T>;
}
