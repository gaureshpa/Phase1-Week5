interface Transaction {
    id: string;
    description: string;
    amount: number;
}
interface Route {
    path: string;
    params: Record<string, string>;
    component?: (state: AppState, params: Record<string, string>) => HTMLElement;
}
interface AppState {
    transactions: Transaction[];
    route: Route | null;
    loading: boolean;
    error: string | null;
}
interface Action {
    type: string;
    payload?: unknown;
}
export declare function reducer(state: AppState, action: Action): AppState;
export {};
