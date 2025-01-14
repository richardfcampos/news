export interface IAxiosError<T = any> {
    response?: {
        data: T;
    };
}
