interface AppState {
    transactions: Transaction[];
    route: Route | null;
    loading: boolean;
    error: string | null;
}
interface Transaction {
    id: string;
    description: string;
    amount: number;
}
interface Route {
    path: string;
    params: Record<string, string>;
    component?: PageComponent;
}
export interface PageComponent {
    (state: AppState, params: Record<string, string>): HTMLElement;
}
export interface Store {
    getState(): AppState;
    dispatch(action: Action): void;
}
interface Action {
    type: string;
    payload?: unknown;
}
interface MatchedRoute {
    component: PageComponent;
    params: Record<string, string>;
}
export declare function createRouter(store: Store): {
    register: (path: string, component: PageComponent) => void;
    navigate: (path: string) => void;
    handleRoute: () => MatchedRoute | null;
};
export {};
