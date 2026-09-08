import { describe, it, expect } from "vitest";
import { createStore } from "../src/store";
import { reducer } from "../src/reducer";

interface State {
    transactions: {
        id: string;
        description: string;
        amount: number;
    }[];

    route: null;
    loading: boolean;
    error: string | null;
}

describe("Typed state manager", ()=> {
    it("dispatches typed actions and maintains the correct shape", ()=> {
        const initialState: State = {
            transactions: [],
            route: null,
            loading: false,
            error: null
        }

        const store = createStore(initialState, reducer);

        store.dispatch({
            type: "ADD_TRANSACTION",
            payload: {
                id: "1",
                description: "Lunch",
                amount: 80
            }
        });

        const state = store.getState();

        expect(state.transactions).toHaveLength(1);
        expect(state.transactions[0].id).toBe("1");
        expect(state.transactions[0].description).toBe("Lunch");
        expect(state.transactions[0].amount).toBe(80);
        expect(state.loading).toBe(false);
        expect(state.error).toBe(null);
    });
});
