import { describe, it, expect, vi } from "vitest";
import { createStore } from "../src/store";
describe("createStore", () => {
    it("dispatches an action and change state", () => {
        const initialState = {
            count: 0
        };
        /**
         * @param {{ count: number }} state
         * @param {{ type: string }} action
         */
        function reducer(state, action) {
            if (action.type === "INCREMENT") {
                return {
                    ...state,
                    count: state.count + 1
                };
            }
            return state;
        }
        const store = createStore(initialState, reducer);
        store.dispatch({
            type: "INCREMENT"
        });
        expect(store.getState().count).toBe(1);
    });
    it("notifies subscribers when state changes", () => {
        const initialState = {
            count: 0
        };
        /**
         * @param {{ count: number }} state
         * @param {{ type: string }} action
         */
        function reducer(state, action) {
            if (action.type === "INCREMENT") {
                return {
                    ...state,
                    count: state.count + 1
                };
            }
            return state;
        }
        const store = createStore(initialState, reducer);
        const listener = vi.fn();
        store.subscribe(listener);
        store.dispatch({
            type: "INCREMENT"
        });
        expect(listener).toHaveBeenCalledTimes(1);
    });
    it("can unsubscribe listener", () => {
        const initialState = {
            count: 0
        };
        /**
         * @param {{ count: number }} state
         * @param {{ type: string }} action
         */
        function reducer(state, action) {
            return state;
        }
        const store = createStore(initialState, reducer);
        const listener = vi.fn();
        const unsubscribe = store.subscribe(listener);
        unsubscribe();
        store.dispatch({
            type: "TEST"
        });
        expect(listener).not.toHaveBeenCalled();
    });
});
