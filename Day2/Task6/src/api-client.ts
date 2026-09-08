export interface ApiClient {
    get<T> (path: string): Promise<T>;
    post<T, B>(path: string, body: B): Promise<T>;
    put<T, B>(path: string, body: B): Promise<T>;
    delete<T>(path: string): Promise<T>;
}

type RequestInterceptor = (
    url: string,
    options: RequestInit
) => RequestInit;

type ResponseInterceptor = <T>(
    response: T
) => T;

class ApiClientImpl implements ApiClient {
    constructor(private baseUrl: string) {}

    private async fetchJSON<T>(
        path: string,
        options: RequestInit = {}
    ): Promise<T> {
        let url = this.baseUrl + path;
        const response = await fetch(url, options);
        return response.json() as Promise<T>;
    }

    async get<T>(path: string): Promise<T> {
        return this.fetchJSON<T>(path);
    }

    async post<T, B>(path: string, body: B): Promise<T> {
        return this.fetchJSON<T>(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    async put<T, B>(path: string, body: B): Promise<T> {
        return this.fetchJSON<T>(path, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    async delete<T>(path: string): Promise<T> {
        return this.fetchJSON<T>(path, {
            method: "DELTE"
        });
    }
}


class ApiClientWithInterceptors implements ApiClient {
    constructor(
        private baseUrl: string,
        private requestInterceptor?: RequestInterceptor,
        private responseInterceptor?: ResponseInterceptor
    ) {}

    private async fetchJSON<T>(
        path: string,
        options: RequestInit = {}
    ): Promise<T> {
        let requestOptions = options;
        
        if(this.requestInterceptor) {
            requestOptions = this.requestInterceptor(
                this.baseUrl + path, options
            );
        }

        const response = await fetch(
            this.baseUrl + path, requestOptions
        )

        let data = await response.json() as T;

        if(this.responseInterceptor) {
            data = this.responseInterceptor(data);
        }

        return data;
    }

    async get<T>(path: string): Promise<T> {
        return this.fetchJSON<T>(path);
    }

    async post<T, B>(path: string, body: B): Promise<T> {
        return this.fetchJSON<T>(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    async put<T, B>(path: string, body: B): Promise<T> {
        return this.fetchJSON<T>(path, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }

    async delete<T>(path: string): Promise<T> {
        return this.fetchJSON<T>(path, {
            method: "DELTE"
        });
    }
}

