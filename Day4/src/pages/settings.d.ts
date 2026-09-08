declare global {
    interface Window {
        store: any;
    }
}
interface PageState {
    transactions: Transaction[];
    loading: boolean;
    error: string | null;
}
interface Transaction {
    id: string;
    description: string;
    amount: number;
}
export declare function renderSettingsPage(state: PageState): HTMLDivElement;
export {};
