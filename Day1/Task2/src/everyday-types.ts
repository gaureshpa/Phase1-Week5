// string
let username: string = "gaureshpa";

// number
let age: number = 24;

// boolean
let isGraduated: boolean = true;

// null
let selectedCourse: string | null = null;

// undefined
let grade: string | undefined = undefined;

// symbol
const userId: symbol = Symbol("userId");

// bigint
const bignum: bigint = 39839389848382n;

// any
let temp: any = "Light";

// better replacement for any
let tempData: string = "Light";

// unknown
let apiData: unknown = "Light";

// never
function fail (message: string): never {
    throw new Error(message);
}

// void
function printMessage(message: string): void {
    console.log(message);
}

// object
let user: object = {
    name: "Martin",
    age: 22
};

// Better object type
let typedUser: {name: string, age: number} = {
    name: "Martin",
    age: 22
};

// array
let names: string[] = ["Martin", "Aadith", "Keshu"];

// number array
let marks: number[] = [50, 65, 49];

// boolean array
let flags: boolean[] = [true, true, false];

// tuple
let person: [string, number] = ["Martin", 22];

// union
let id: string | number = 101;

// nullable string
let nickname: string | null = null;

// optional/undefined string
let email: string | undefined = undefined;

// object with optional property
let employee: {
    name: string;
    age: number;
    department?: string;
} = {
    name: "Fadhil",
    age: 22,
    department: "Development"
};


// Functions

function add(a: number, b: number) {
    return a+b;
}

function greetPerson(name: string): string {
    return `Hello, ${name}`;
}

function isAdult(age: number): boolean {
    return age >= 18;
}

function logMessage(message: string): void {
    console.log(message);
}

function getScores(): number[] {
    return [90, 67, 81];
}


// Type interference

function multiply(a: number, b: number) {
    return a * b;
}

function makeGreeting(name: string) {
    return `Hello ${name}`;
}


// const vs let

const greeting = "Hello";
let message = "Hello";


// Union + typeof

function processValue(value: string | number): void {
    if(typeof value === "string") {
        console.log(`String: ${value.toUpperCase()}`);
    }
    else {
        console.log(`Number: ${value.toFixed(2)}`);
    }
}


console.log(add(1, 4));
console.log(greetPerson("Layla"));
console.log(isAdult(22));
logMessage("Welcome");
console.log(getScores());

console.log(multiply(5, 8));
console.log(makeGreeting("Eric"));

processValue("light");
processValue(67);
