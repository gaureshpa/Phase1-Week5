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
export declare function renderDetailPage(state: PageState, params?: Record<string, string>): HTMLDivElement;
export {};
