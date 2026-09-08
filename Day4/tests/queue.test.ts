import { describe, it, expect } from "vitest";
import { Queue } from "@utils/Queue";

describe("Queue<T>", ()=> {
    it("stores and retrieves strings", ()=> {
        const queue = new Queue<string>();

        queue.enqueue("first");
        queue.enqueue("second");

        expect(queue.dequeue()).toBe("first");
        expect(queue.dequeue()).toBe("second");
    });

    it("stores and retrieves numbers", ()=> {
        const queue = new Queue<number>();

        queue.enqueue(10);
        queue.enqueue(20);

        expect(queue.dequeue()).toBe(10);
        expect(queue.dequeue()).toBe(20);
    });

    it("stores and retrieves objects", ()=> {
        const queue = new Queue<{id: number; name: string}>();

        const user = {
            id: 1,
            name: "Mbappe"
        };

        queue.enqueue(user);

        expect(queue.dequeue()).toEqual(user);
    });
});
