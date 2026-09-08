function sealed<T extends Function>(constructor: T): T {
    Object.seal(constructor);
    Object.seal(constructor.prototype);

    return constructor;
}

function log(
    target: object,
    propertyKey: string,
    descriptor: PropertyDescriptor
): void {
    const originalMethod = descriptor.value;

    if (typeof originalMethod !== "function") {
        throw new TypeError(`@log can only be applied to methods: ${propertyKey}`);
    }

    descriptor.value = function (
        this: unknown,
        ...args: unknown[]
    ): unknown {
        console.log(`Calling ${propertyKey}`);
        console.log("Arguments:", args);

        const result = originalMethod.apply(this, args);
        console.log("Return value:", result);
        return result;
    };
}


@sealed
class User {
    constructor(
        public name: string,
        public age: number
    ) {}

    @log
    greet(message: string): string {
        return `${message}, My name is ${this.name}`;
    }
}

const user = new User("Mbappe", 27);
const result = user.greet("Hello");

console.log("Final result:", result);
console.log("Prototype sealed:", Object.isSealed(User.prototype));
console.log("Constructor sealed:", Object.isSealed(User));
