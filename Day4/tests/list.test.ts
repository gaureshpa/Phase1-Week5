import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderListPage } from "../src/pages/list";

describe("renderListPage", () => {
    beforeEach(() => {
        window.store = {
            getState: vi.fn(() => ({
                transactions: []
            })),
            dispatch: vi.fn()
        };
    });

    it("renders expense transactions", () => {
        const state = {
            transactions: [
                {
                    id: "1",
                    description: "Lunch",
                    amount: 250
                },

                {
                    id: "2",
                    description: "Bus",
                    amount: 13
                }
            ],
            loading: false,
            error: null
        };

        const page = renderListPage(state);

        expect(page.textContent).toContain("Lunch");
        expect(page.textContent).toContain("250");

        expect(page.textContent).toContain("Bus");
        expect(page.textContent).toContain("13");
    });

    it("shows empty message when there are no expenses", ()=>{
        const state = {
            transactions: [],
            loading: false,
            error: null
        };

        const page = renderListPage(state);
        expect(page.textContent).toContain("No expenses yet");
    });

    it("shows loading message", () => {
        const state = {
            transactions: [],
            loading: true,
            error: null
        };

        const page = renderListPage(state);
        expect(page.textContent).toContain("Loading...");
    });
});
