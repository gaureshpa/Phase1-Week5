export async function withLoading(store, operation) {
    store.dispatch({
        type: "CLEAR_ERROR"
    });
    store.dispatch({
        type: "SET_LOADING",
        payload: true
    });
    try {
        return await operation();
    }
    catch (error) {
        console.error(error);
        store.dispatch({
            type: "SET_ERROR",
            payload: "Something went wrong. Please try again."
        });
        return null;
    }
    finally {
        store.dispatch({
            type: "SET_LOADING",
            payload: false
        });
    }
}
