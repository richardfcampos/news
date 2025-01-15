export interface IAxiosError<T = unknown> {
    response?: {
        data: T;
    };
}
