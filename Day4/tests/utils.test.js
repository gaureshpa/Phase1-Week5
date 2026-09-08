import { describe, it, expect, vi } from "vitest";
import { withLoading } from "../src/utils.js";
describe("withLoading", () => {
    it("runs the operation successfully", async () => {
        const store = {
            dispatch: vi.fn()
        };
        const operation = vi.fn(async () => {
            return "success";
        });
        const result = await withLoading(store, operation);
        expect(result).toBe("success");
        expect(operation).toHaveBeenCalled();
        expect(store.dispatch).toHaveBeenCalledWith({
            type: "CLEAR_ERROR"
        });
        expect(store.dispatch).toHaveBeenCalledWith({
            type: "SET_LOADING",
            payload: true
        });
        expect(store.dispatch).toHaveBeenCalledWith({
            type: "SET_LOADING",
            payload: false
        });
    });
    it("handles an operation error", async () => {
        const store = { dispatch: vi.fn() };
        const operation = vi.fn(async () => {
            throw new Error("Test error");
        });
        const result = await withLoading(store, operation);
        expect(result).toBe(null);
        expect(store.dispatch).toHaveBeenCalledWith({
            type: "SET_ERROR",
            payload: "Something went wrong. Please try again."
        });
        expect(store.dispatch).toHaveBeenCalledWith({
            type: "SET_LOADING",
            payload: false
        });
    });
});
