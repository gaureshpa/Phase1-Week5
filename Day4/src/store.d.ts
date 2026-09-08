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
    (store: Store<State>): (next: (action: Action) => void) => (action: Action) => void;
}
export declare function createStore<State>(initialState: State, reducer: Reducer<State>, middleware?: Middleware<State>): Store<State>;
export {};
