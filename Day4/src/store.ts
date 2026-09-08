interface Action {
    type: string;
    payload?: unknown;
}

interface Reducer<State> {
    (state: State, action: Action): State;
}

interface Store<State> {
    getState(): State;
    dispatch(action: Action): void;
    subscribe(listener: () => void): () => void;
}

interface Middleware<State> {
    (store: Store<State>): (
        next: (action: Action) => void
    ) => (action: Action) => void;
}

export function createStore<State>(
    initialState: State,
    reducer: Reducer<State>,
    middleware?: Middleware<State>
): Store<State> {
    let state = initialState;

    const listeners: (() => void)[] = [];

    function getState(): State {
        return state;
    }

    function dispatch(action: Action): void {
        state = reducer(state, action);

        listeners.forEach((listener) => listener());
    }

    function subscribe(
        listener: () => void
    ): () => void {
        listeners.push(listener);

        return function unsubscribe(): void {
            const index = listeners.indexOf(listener);

            if (index !== -1) {
                listeners.splice(index, 1);
            }
        };
    }

    const store: Store<State> = {
        getState,
        dispatch,
        subscribe
    };

    if (middleware) {
        const originalDispatch = store.dispatch;

        store.dispatch = middleware(store)(
            originalDispatch
        );
    }

    return store;
}
