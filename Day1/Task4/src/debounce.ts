type AnyFunction = (...args: never[]) => unknown;

function debounce<T extends AnyFunction>(fn: T, delay: number): 
    (...args: Parameters<T>) => void {
        let timeoutId: ReturnType<typeof setTimeout> | undefined;

        return(...args: Parameters<T>): void => {
            if(timeoutId !== undefined) {
                clearTimeout(timeoutId);
            }

            timeoutId = setTimeout((): void => {
                fn(...args);
            }, delay);
        };
}

export default debounce;
