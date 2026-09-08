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
        router: any;
    }
}
export declare function renderHomePage(state: PageState): HTMLDivElement;
export {};
