export interface ApiResponse<T> {
    data: T;
}
export declare class ApiClient {
    get<T>(url: string): Promise<T>;
}
