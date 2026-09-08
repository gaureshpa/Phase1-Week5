interface Transaction {
    id: string;
    description: string;
    amount: number;
}

interface Route {
    path: string;
    params: Record<string, string>;
    component?: (
        state: AppState,
        params: Record<string, string>
    ) => HTMLElement;
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

export function reducer(
    state: AppState,
    action: Action
): AppState {
    switch (action.type) {
        case "SET_ROUTE":
            return {
                ...state,
                route: action.payload as Route
            };

        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    action.payload as Transaction
                ]
            };

        case "UPDATE_TRANSACTION": {
            const transaction = action.payload as Transaction;

            return {
                ...state,
                transactions: state.transactions.map((item) =>
                    item.id === transaction.id
                        ? {
                              ...item,
                              ...transaction
                          }
                        : item
                )
            };
        }

        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter(
                    (transaction) =>
                        transaction.id !== action.payload
                )
            };

        case "CLEAR_TRANSACTIONS":
            return {
                ...state,
                transactions: []
            };

        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload as boolean
            };

        case "SET_ERROR":
            return {
                ...state,
                error: action.payload as string
            };

        case "CLEAR_ERROR":
            return {
                ...state,
                error: null
            };

        default:
            return state;
    }
}

