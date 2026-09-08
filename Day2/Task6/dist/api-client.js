class ApiClientImpl {
    baseUrl;
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }
    async fetchJSON(path, options = {}) {
        let url = this.baseUrl + path;
        const response = await fetch(url, options);
        return response.json();
    }
    async get(path) {
        return this.fetchJSON(path);
    }
    async post(path, body) {
        return this.fetchJSON(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    async put(path, body) {
        return this.fetchJSON(path, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    async delete(path) {
        return this.fetchJSON(path, {
            method: "DELTE"
        });
    }
}
class ApiClientWithInterceptors {
    baseUrl;
    requestInterceptor;
    responseInterceptor;
    constructor(baseUrl, requestInterceptor, responseInterceptor) {
        this.baseUrl = baseUrl;
        this.requestInterceptor = requestInterceptor;
        this.responseInterceptor = responseInterceptor;
    }
    async fetchJSON(path, options = {}) {
        let requestOptions = options;
        if (this.requestInterceptor) {
            requestOptions = this.requestInterceptor(this.baseUrl + path, options);
        }
        const response = await fetch(this.baseUrl + path, requestOptions);
        let data = await response.json();
        if (this.responseInterceptor) {
            data = this.responseInterceptor(data);
        }
        return data;
    }
    async get(path) {
        return this.fetchJSON(path);
    }
    async post(path, body) {
        return this.fetchJSON(path, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    async put(path, body) {
        return this.fetchJSON(path, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });
    }
    async delete(path) {
        return this.fetchJSON(path, {
            method: "DELTE"
        });
    }
}
export {};
