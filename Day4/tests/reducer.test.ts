import { describe, it, expect } from "vitest";
import { reducer } from "../src/reducer";

describe("reducer", () => {
    it("sets the route", () => {
        const state = {
            transactions: [],
            route: null,
            loading: false,
            error: null
        };

        const newState = reducer(state, {
            type: "SET_ROUTE",
            payload: {
                path: "/home",
                params: {}
            }
        });

        expect(newState.route).not.toBeNull();
        
        const route = newState.route;
        expect(newState.route).toEqual(
            expect.objectContaining({
                path: "/home"
            })
        );
    });

    it("adds a transaction", () => {
        const state = {
            transactions: [],
            route: null,
            loading: false,
            error: null
        };

        const transaction = {
            id: "1",
            description: "Lunch",
            amount: 250
        };

        const newState = reducer(state, {
            type: "ADD_TRANSACTION",
            payload: transaction
        });

        expect(newState.transactions).toEqual([transaction]);
    });

    it("updates a transaction", () => {
        const state = {
            transactions: [
                {
                    id: "1",
                    description: "Lunch",
                    amount: 250
                }
            ],
            route: null,
            loading: false,
            error: null
        };

        const newState = reducer(state, {
            type: "UPDATE_TRANSACTION",
            payload: {
                id: "1",
                description: "Dinner",
                amount: 500
            }
        });

        expect(newState.transactions[0]).toEqual({
            id: "1",
            description: "Dinner",
            amount: 500
        });
    });

    it("deletes a transaction", () => {
        const state = {
            transactions: [
                {
                    id: "1",
                    description: "Lunch",
                    amount: 250
                }
            ],
            route: null,
            loading: false,
            error: null
        };

        const newState = reducer(state, {
            type: "DELETE_TRANSACTION",
            payload: "1"
        });

        expect(newState.transactions).toEqual([]);
    });

    it("clears all transactions", () => {
        const state = {
            transactions: [
                {
                    id: "1",
                    description: "Lunch",
                    amount: 250
                }
            ],
            route: null,
            loading: false,
            error: null
        };

        const newState = reducer(state, {
            type: "CLEAR_TRANSACTIONS"
        });

        expect(newState.transactions).toEqual([]);
    });

    it("sets loading state", () => {
        const state = {
            transactions: [],
            route: null,
            loading: false,
            error: null
        };

        const newState = reducer(state, {
            type: "SET_LOADING",
            payload: true
        });

        expect(newState.loading).toBe(true);
    });

    it("sets error", () => {
        const state = {
            transactions: [],
            route: null,
            loading: false,
            error: null
        };

        const newState = reducer(state, {
            type: "SET_ERROR",
            payload: "Something went wrong"
        });

        expect(newState.error).toBe("Something went wrong");
    });

    it("clears error", () => {
        const state = {
            transactions: [],
            route: null,
            loading: false,
            error: "Something went wrong"
        };

        const newState = reducer(state, {
            type: "CLEAR_ERROR"
        });

        expect(newState.error).toBe(null);
    });

    it("returns the existing state for unknown action", () => {
        const state = {
            transactions: [],
            route: null,
            loading: false,
            error: null
        };

        const newState = reducer(state, {
            type: "UNKNOWN"
        });

        expect(newState).toBe(state);
    });
});
