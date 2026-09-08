import { describe, it, expect, vi, afterEach } from "vitest";
import { ApiClient } from "../src/utils/ApiClient";

interface User {
    id: number;
    name: string;
}

describe("ApiClient", () => {

    afterEach(() => {
        vi.unstubAllGlobals();
    });

    it("returns correctly typed response data", async ()=> {
        const mockUser: User = {
            id: 1,
            name: "Mbappe"
        };

        const mockResponse = {
            ok: true,
            status: 200,
            json: async () => mockUser
        }

        vi.stubGlobal("fetch", vi.fn().mockResolvedValue(mockResponse));

        const client = new ApiClient();
        const result = await client.get<User>("/users/1");

        expect(result).toEqual(mockUser);
        expect(result.id).toBe(1);
        expect(result.name).toBe("Mbappe");

        vi.unstubAllGlobals();
    });
});
