import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({

    resolve: {
        alias: {
            "@utils": path.resolve(__dirname, "src/utils"),
            "@components": path.resolve(__dirname, "src/components")
        }
    },

    test: {
        environment: "jsdom",
        globals: true
    },

    base: "/Week4-Project"
});
