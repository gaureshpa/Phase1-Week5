"use strict";
//  Type narrowing
function processInput(value) {
    if (typeof value === "string") {
        console.log("String: ", value.toUpperCase());
    }
    else if (typeof value === "number") {
        console.log("Number:", value.toFixed(2));
    }
    else if (typeof value === "boolean") {
        console.log("Boolean:", value);
    }
    else if (value === null) {
        console.log("No value");
    }
}
processInput("hello");
processInput(42);
processInput(true);
processInput(null);
processInput(undefined);
function isUser(value) {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    const obj = value;
    return (typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        (obj.role === "admin" || obj.role === "viewer" || obj.role === "editor") &&
        typeof obj.createdAt === "string" &&
        (obj.avatar === undefined ||
            typeof obj.avatar === "string"));
}
const apiResponse = {
    id: 1,
    name: "Messi",
    email: "messi@intermiami.com",
    role: "editor",
    createdAt: "2026-03-01"
};
if (isUser(apiResponse)) {
    console.log("Valid user:", apiResponse.name);
}
// Exhaustive switch
function assertNever(value) {
    throw new Error(`Unexpected value: ${value}`);
}
function getArea(shape) {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius ** 2;
        case "rect":
            return shape.w * shape.h;
        case "triangle":
            return 0.5 * shape.base * shape.height;
        default:
            return assertNever(shape);
    }
}
console.log("Circle area:", getArea({
    kind: "circle",
    radius: 5
}));
console.log("Rectangle area:", getArea({
    kind: "rect",
    w: 10,
    h: 5
}));
