interface Transaction {
    id: string;
    description: string;
    amount: number;
}
interface PageState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}
declare global {
    interface Window {
        store: any;
        router: any;
    }
}
export declare function renderListPage(state: PageState): HTMLDivElement;
export {};
