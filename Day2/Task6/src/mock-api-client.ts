import { ApiClient } from "./api-client";

export class MockApiClient implements ApiClient {
    private delay<T>(data: T): Promise<T> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 1000);
        })
    }

    async get<T>(path: string): Promise<T> {
        console.log("GET", path);
        return this.delay({} as T);
    }

    async post<T, B>(path: string, body: B): Promise<T> {
        console.log("POST", path, body);
        return this.delay({} as T);
    }

    async put<T, B>(path: string, body: B): Promise<T> {
        console.log("PUT", path, body);
        return this.delay({} as T);
    }

    async delete<T>(path: string): Promise<T> {
        console.log("DELETE", path);
        return this.delay({} as T);
    }
}
