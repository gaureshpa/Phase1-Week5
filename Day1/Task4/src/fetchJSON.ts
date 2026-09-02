export class HttpError extends Error {
    readonly status: number;

    constructor(response: Response) {
        super(`HTTP Error: ${response.status}`);
        this.name = "HttpError";
        this.status = response.status;
    }
}

export async function fetchJSON<T> (
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response: Response = await fetch(url, options);

    if(!response.ok) {
        throw new HttpError(response);
    }

    return response.json() as Promise<T>;
}

export function fetchWithTimeout(
    url: string,
    timeout: number = 5000
): Promise<Response> {
    const controller: AbortController = new AbortController();
    const timeoutId: ReturnType<typeof setTimeout> = setTimeout(
        (): void => {
            controller.abort();
        },
        timeout
    );

    return fetch(url, {
        signal: controller.signal
    }).finally((): void => {
        clearTimeout(timeoutId);
    });
}
