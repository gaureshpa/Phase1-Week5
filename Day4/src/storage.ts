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

type Middleware = (
    store: Store
) => (next: Next) => (action: Action) => void;

export const storageMiddleware: Middleware = (store) => {
    return (next) => {
        return (action) => {
            const result = next(action);
            const state = store.getState();

            localStorage.setItem(
                "expense-tracker",
                JSON.stringify(state.transactions)
            );

            return result;
        };
    };
};

export function loadState(): AppState | null {
    const savedTransactions = localStorage.getItem("expense-tracker");

    if (!savedTransactions) {
        return null;
    }

    try {
        return {
            transactions: JSON.parse(savedTransactions) as Transaction[]
        };
    } catch (error) {
        console.error("Failed to load saved state: ", error);
        return null;
    }
}
