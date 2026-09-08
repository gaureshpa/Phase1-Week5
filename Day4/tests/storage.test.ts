import { describe, it, expect, vi, beforeEach } from "vitest";
import { storageMiddleware, loadState } from "../src/storage";

describe("storage", () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it("saves transactions to localStorage", () => {
        const store = {
            getState: vi.fn(() => ({
                transactions: [
                    {
                        id: "1",
                        description: "Lunch",
                        amount: 250
                    }
                ]
            }))
        };

        const next = vi.fn(() => "result");
        const middleware = storageMiddleware(store);
        const action = {
            type: "ADD_TRANSACTION"
        };
        const result = middleware(next)(action);

        expect(next).toHaveBeenCalledWith(action);
        expect(result).toBe("result");
        expect(localStorage.getItem("expense-tracker"))
            .toBe(JSON.stringify([
                {
                    id: "1",
                    description: "Lunch",
                    amount: 250
                }
            ]));
    });


    it("loads saved transactions", () => {
        const transactions = [
            {
                id: "1",
                description: "Lunch",
                amount: 250
            }
        ];

        localStorage.setItem(
            "expense-tracker",
            JSON.stringify(transactions)
        );

        const state = loadState();

        expect(state).toEqual({
            transactions
        });
    });


    it("returns null when nothing is saved", () => {
        const state = loadState();

        expect(state).toBe(null);
    });


    it("returns null when saved data is invalid", () => {
        localStorage.setItem(
            "expense-tracker",
            "invalid json"
        );

        const state = loadState();

        expect(state).toBe(null);
    });

});
