import { describe, it, expect } from "vitest";
import { renderDetailPage } from "../src/pages/detail";
describe("renderDetailPage", () => {
    it("renders transaction details", () => {
        const state = {
            transactions: [
                {
                    id: "123",
                    description: "Lunch",
                    amount: 250
                }
            ],
            loading: false,
            error: null
        };
        const page = renderDetailPage(state, {
            id: "123"
        });
        expect(page.textContent).toContain("Expense Detail");
        expect(page.textContent).toContain("Lunch");
        expect(page.textContent).toContain("250");
    });
    it("shows not found message", () => {
        const state = {
            transactions: [],
            loading: false,
            error: null
        };
        const page = renderDetailPage(state, {
            id: "999"
        });
        expect(page.textContent).toContain("Expense 999 not found");
    });
});
