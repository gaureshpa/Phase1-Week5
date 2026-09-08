interface Store {
    dispatch(action: {
        type: string;
        payload?: unknown;
    }): void
}

export async function withLoading(store: Store, operation: ()=> Promise<unknown>) {
    store.dispatch({
        type: "CLEAR_ERROR"
    });

    store.dispatch({
        type: "SET_LOADING",
        payload: true
    });

    try {
        return await operation();
    } catch (error) {
        console.error(error);

        store.dispatch({
            type: "SET_ERROR",
            payload: "Something went wrong. Please try again."
        });

        return null;
    } finally {
        store.dispatch({
            type: "SET_LOADING",
            payload: false
        });
    }
}
