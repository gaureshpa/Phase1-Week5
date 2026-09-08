export class MockApiClient {
    delay(data) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(data);
            }, 1000);
        });
    }
    async get(path) {
        console.log("GET", path);
        return this.delay({});
    }
    async post(path, body) {
        console.log("POST", path, body);
        return this.delay({});
    }
    async put(path, body) {
        console.log("PUT", path, body);
        return this.delay({});
    }
    async delete(path) {
        console.log("DELETE", path);
        return this.delay({});
    }
}
