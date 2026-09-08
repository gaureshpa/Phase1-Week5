export function createStore(initiaState, reducer) {
    let state = initiaState;
    const listeners = [];
    function getState() {
        return state;
    }
    function dispatch(action) {
        state = reducer(state, action);
        listeners.forEach((listener) => listener(state));
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
    return { getState, dispatch, subscribe };
}
