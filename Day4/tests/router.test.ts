import { describe, it, expect, vi, beforeEach } from "vitest";
import { createRouter, type Store, type PageComponent } from "../src/router.js";
import { createStore } from "../src/store.js";

interface TestState {
    transactions: unknown[];
    route: {
        path: string;
        params: Record<string, string>;
        component?: (...args: unknown[]) => HTMLElement;
    };
}

interface TestStore {
    getState(): TestState;
    dispatch(action: {
        type: string;
        payload?: unknown;
    }): void;
    subscribe(listener: () => void): () => void;
}

interface TestRouter {
    register(
        path: string,
        component: (...args: unknown[]) => HTMLElement
    ): void;
    navigate(path: string): void;
    handleRoute(): unknown;
}

describe("Router", () => {
    /** @type {any} */
    let store: any;

    /** @type {any} */
    let router: any;

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
        const reducer = (state: any, action: any) => {
            if (action.type === "SET_ROUTE") {
                return {
                    ...state,
                    route: action.payload
                };
            }

            return state;
        };

        store = createStore(
            initialState,
            reducer
        );

        router = createRouter(store);

        window.history.pushState(
            {},
            "",
            "/"
        );
    });

    it("navigates to a registred route", () => {
        const HomePage = vi.fn();

        router.register(
            "/home",
            HomePage
        );

        router.navigate("/home");

        expect(
            window.location.pathname
        ).toBe("/home");

        expect(
            store.getState().route.path
        ).toBe("/home");

        expect(
            store.getState().route.component
        ).toBe(HomePage);
    });

    it("extracts dynamic router parameters", () => {
        const DetailPage = vi.fn();

        router.register(
            "/detail/:id",
            DetailPage
        );

        router.navigate(
            "/detail/123"
        );

        const route =
            store.getState().route;

        expect(route.path).toBe(
            "/detail/123"
        );

        expect(route.params.id).toBe(
            "123"
        );

        expect(route.component).toBe(
            DetailPage
        );
    });
});