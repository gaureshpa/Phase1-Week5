interface Store {
    dispatch(action: {
        type: string;
        payload?: unknown;
    }): void;
}
export declare function withLoading(store: Store, operation: () => Promise<unknown>): Promise<unknown>;
export {};
