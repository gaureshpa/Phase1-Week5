export function createStore(initialState, reducer, middleware) {
    let state = initialState;
    const listeners = [];
    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener());
    }
    function subscribe(listener) {
        listeners.push(listener);
        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            if (index !== -1) {
                listeners.splice(index, 1);
            }
        };
    }
    const store = {
        getState,
        dispatch,
        subscribe
    };
    if (middleware) {
        const originalDispatch = store.dispatch;
        store.dispatch = middleware(store)(originalDispatch);
    }
    return store;
}
