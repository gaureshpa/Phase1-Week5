// IsArray<T>
type IsArray<T> = T extends any[] ? true : false;

type Test1 = IsArray<string[]>;
type Test2 = IsArray<string>;

const test1: Test1 = true;
const test2: Test2 = false;

console.log(test1);
console.log(test2);


// Flatten<T>
type Flatten<T> = T extends Array<infer Item>? Item: T;

type NumberArray = Flatten<number[]>;
type StringValue = Flatten<string>;

const numberValue: NumberArray = 10;
const stringValue: StringValue = "Olise";

console.log(numberValue);
console.log(stringValue);


// Awaited<T>

type MyAwaited<T> = T extends Promise<infer U> ? MyAwaited<U> : T;
type Result = MyAwaited<Promise<Promise<string>>>;

const result: Result = "Hello";
console.log(result);


type MyParameters<T> = T extends (...args: infer P) => any ? P : never;
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

function add(a: number, b: number): number {
    return a + b;
}

type AddParameters = MyParameters<typeof add>;
const parameters: AddParameters = [10, 20];
console.log(parameters);

type AddReturn = MyReturnType<typeof add>
const returnValue: AddReturn = add(10,20);
console.log(returnValue);
