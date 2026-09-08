interface Transaction {
    id: string;
    description: string;
    amount: number;
}
interface AppState {
    transactions: Transaction[];
}
interface Action {
    type: string;
    payload?: unknown;
}
interface Store {
    getState(): AppState;
}
type Next = (action: Action) => void;
type Middleware = (store: Store) => (next: Next) => (action: Action) => void;
export declare const storageMiddleware: Middleware;
export declare function loadState(): AppState | null;
export {};
