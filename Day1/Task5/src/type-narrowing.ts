//  Type narrowing

function processInput(
    value: string | number | boolean | null | undefined
): void {
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


// Custom type guard

interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "viewer" | "editor";
    createdAt: string;
    avatar?: string;
}

function isUser(value: unknown): value is User {
    if(typeof value !== "object" || value === null) {
        return false;
    }

    const obj = value as Record<string, unknown>;

    return (
        typeof obj.id === "number" &&
        typeof obj.name === "string" &&
        typeof obj.email === "string" &&
        (
            obj.role === "admin" || obj.role === "viewer" || obj.role === "editor"
        ) &&
        typeof obj.createdAt === "string" &&
        (
            obj.avatar === undefined ||
            typeof obj.avatar === "string"
        )
    );
}

const apiResponse: unknown = {
    id: 1,
    name: "Messi",
    email: "messi@intermiami.com",
    role: "editor",
    createdAt: "2026-03-01"
};

if (isUser(apiResponse)) {
    console.log("Valid user:", apiResponse.name);
}


// Discriminated union

type Shape = 
    | {
        kind: "circle";
        radius: number;
    }
    | {
        kind: "rect";
        w: number;
        h: number;
    }
    | {
        kind: "triangle";
        base: number;
        height: number;
    }



// Exhaustive switch

function assertNever(value: never): never {
    throw new Error(`Unexpected value: ${value}`);
}

function getArea(shape: Shape): number {
    switch (shape.kind) {
        case "circle":
            return Math.PI * shape.radius **2;

        case "rect":
            return shape.w * shape.h;

        case "triangle":
            return 0.5 * shape.base * shape.height;
        
        default:
            return assertNever(shape);
    }
}

console.log("Circle area:",
    getArea({
        kind: "circle",
        radius: 5
    })
);

console.log("Rectangle area:", 
    getArea({
        kind: "rect",
        w: 10,
        h: 5
    })
);
