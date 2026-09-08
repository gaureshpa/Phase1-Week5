"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function sealed(constructor) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
    return constructor;
}
function log(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    if (typeof originalMethod !== "function") {
        throw new TypeError(`@log can only be applied to methods: ${propertyKey}`);
    }
    descriptor.value = function (...args) {
        console.log(`Calling ${propertyKey}`);
        console.log("Arguments:", args);
        const result = originalMethod.apply(this, args);
        console.log("Return value:", result);
        return result;
    };
}
let User = class User {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    greet(message) {
        return `${message}, My name is ${this.name}`;
    }
};
__decorate([
    log
], User.prototype, "greet", null);
User = __decorate([
    sealed
], User);
const user = new User("Mbappe", 27);
const result = user.greet("Hello");
console.log("Final result:", result);
console.log("Prototype sealed:", Object.isSealed(User.prototype));
console.log("Constructor sealed:", Object.isSealed(User));
