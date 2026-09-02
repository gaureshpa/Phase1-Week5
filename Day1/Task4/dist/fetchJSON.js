export class HttpError extends Error {
    status;
    constructor(response) {
        super(`HTTP Error: ${response.status}`);
        this.name = "HttpError";
        this.status = response.status;
    }
}
export async function fetchJSON(url, options = {}) {
    const response = await fetch(url, options);
    if (!response.ok) {
        throw new HttpError(response);
    }
    return response.json();
}
export function fetchWithTimeout(url, timeout = 5000) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
        controller.abort();
    }, timeout);
    return fetch(url, {
        signal: controller.signal
    }).finally(() => {
        clearTimeout(timeoutId);
    });
}
