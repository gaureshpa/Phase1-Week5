type Action = {
    type: string;
};

export function createStore<S, A extends Action> (
    initiaState: S,
    reducer: (state: S, action: A) => S
) {
    let state = initiaState;
    const listeners: ((state: S) => void)[] =[];

    function getState(): S {
        return state;
    }

    function dispatch(action: A): void {
        state = reducer(state, action);
        listeners.forEach((listener) => listener(state));
    }

    function subscribe(listener: (state: S) => void): () => void {
        listeners.push(listener);

        return function unsubscribe() {
            const index = listeners.indexOf(listener);

            if (index !== -1) {
                listeners.splice(index, 1);
            }
        };
    }

    return {getState, dispatch, subscribe};
}
