"use strict";
// string
let username = "gaureshpa";
// number
let age = 24;
// boolean
let isGraduated = true;
// null
let selectedCourse = null;
// undefined
let grade = undefined;
// symbol
const userId = Symbol("userId");
// bigint
const bignum = 39839389848382n;
// any
let temp = "Light";
// better replacement for any
let tempData = "Light";
// unknown
let apiData = "Light";
// never
function fail(message) {
    throw new Error(message);
}
// void
function printMessage(message) {
    console.log(message);
}
// object
let user = {
    name: "Martin",
    age: 22
};
// Better object type
let typedUser = {
    name: "Martin",
    age: 22
};
// array
let names = ["Martin", "Aadith", "Keshu"];
// number array
let marks = [50, 65, 49];
// boolean array
let flags = [true, true, false];
// tuple
let person = ["Martin", 22];
// union
let id = 101;
// nullable string
let nickname = null;
// optional/undefined string
let email = undefined;
// object with optional property
let employee = {
    name: "Fadhil",
    age: 22,
    department: "Development"
};
// Functions
function add(a, b) {
    return a + b;
}
function greetPerson(name) {
    return `Hello, ${name}`;
}
function isAdult(age) {
    return age >= 18;
}
function logMessage(message) {
    console.log(message);
}
function getScores() {
    return [90, 67, 81];
}
// Type interference
function multiply(a, b) {
    return a * b;
}
function makeGreeting(name) {
    return `Hello ${name}`;
}
// const vs let
const greeting = "Hello";
let message = "Hello";
// Union + typeof
function processValue(value) {
    if (typeof value === "string") {
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
