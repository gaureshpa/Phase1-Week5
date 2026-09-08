import { describe, it, expect, vi, beforeEach } from "vitest";
import { createRouter } from "../src/router.js";
import { createStore } from "../src/store.js";
describe("Router", () => {
    /** @type {any} */
    let store;
    /** @type {any} */
    let router;
    beforeEach(() => {
        const initialState = {
            transactions: [],
            route: {
                path: "/home",
                params: {}
            }
        };
        /**
         * @param {any} state
         * @param {any} action
         */
        const reducer = (state, action) => {
            if (action.type === "SET_ROUTE") {
                return {
                    ...state,
                    route: action.payload
                };
            }
            return state;
        };
        store = createStore(initialState, reducer);
        router = createRouter(store);
        window.history.pushState({}, "", "/");
    });
    it("navigates to a registred route", () => {
        const HomePage = vi.fn();
        router.register("/home", HomePage);
        router.navigate("/home");
        expect(window.location.pathname).toBe("/home");
        expect(store.getState().route.path).toBe("/home");
        expect(store.getState().route.component).toBe(HomePage);
    });
    it("extracts dynamic router parameters", () => {
        const DetailPage = vi.fn();
        router.register("/detail/:id", DetailPage);
        router.navigate("/detail/123");
        const route = store.getState().route;
        expect(route.path).toBe("/detail/123");
        expect(route.params.id).toBe("123");
        expect(route.component).toBe(DetailPage);
    });
});
