export const storageMiddleware = (store) => {
    return (next) => {
        return (action) => {
            const result = next(action);
            const state = store.getState();
            localStorage.setItem("expense-tracker", JSON.stringify(state.transactions));
            return result;
        };
    };
};
export function loadState() {
    const savedTransactions = localStorage.getItem("expense-tracker");
    if (!savedTransactions) {
        return null;
    }
    try {
        return {
            transactions: JSON.parse(savedTransactions)
        };
    }
    catch (error) {
        console.error("Failed to load saved state: ", error);
        return null;
    }
}
