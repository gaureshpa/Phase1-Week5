export function reducer(state, action) {
    switch (action.type) {
        case "SET_ROUTE":
            return {
                ...state,
                route: action.payload
            };
        case "ADD_TRANSACTION":
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    action.payload
                ]
            };
        case "UPDATE_TRANSACTION": {
            const transaction = action.payload;
            return {
                ...state,
                transactions: state.transactions.map((item) => item.id === transaction.id
                    ? {
                        ...item,
                        ...transaction
                    }
                    : item)
            };
        }
        case "DELETE_TRANSACTION":
            return {
                ...state,
                transactions: state.transactions.filter((transaction) => transaction.id !== action.payload)
            };
        case "CLEAR_TRANSACTIONS":
            return {
                ...state,
                transactions: []
            };
        case "SET_LOADING":
            return {
                ...state,
                loading: action.payload
            };
        case "SET_ERROR":
            return {
                ...state,
                error: action.payload
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
