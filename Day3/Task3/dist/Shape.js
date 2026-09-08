"use strict";
class Shape {
    describe() {
        return `This is a ${this.constructor.name} with area ${this.area().toFixed(2)} and perimeter ${this.perimeter().toFixed(2)}`;
    }
    static create(type, ...args) {
        switch (type) {
            case "circle":
                if (args.length !== 1) {
                    throw new Error("Circle requires radius");
                }
                return new Circle(args[0]);
            case "rect":
                if (args.length !== 2) {
                    throw new Error("Rectangle requires two sides");
                }
                return new Rectangle(args[0], args[1]);
            case "triangle":
                if (args.length !== 3) {
                    throw new Error("Triangle requires three sides");
                }
                return new Triangle(args[0], args[1], args[2]);
            default:
                throw new Error(`Unknown shape type: ${type}`);
        }
    }
}
class Circle extends Shape {
    radius;
    constructor(radius) {
        super();
        this.radius = radius;
    }
    area() {
        return Math.PI * this.radius ** 2;
    }
    perimeter() {
        return 2 * Math.PI * this.radius;
    }
}
class Rectangle extends Shape {
    width;
    height;
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }
    area() {
        return this.width * this.height;
    }
    perimeter() {
        return 2 * (this.width + this.height);
    }
}
class Triangle extends Shape {
    a;
    b;
    c;
    constructor(a, b, c) {
        super();
        this.a = a;
        this.b = b;
        this.c = c;
        if (a + b <= c || a + c <= b || b + c <= a) {
            throw new Error("Invalid triangle sides");
        }
    }
    area() {
        const s = this.perimeter() / 2;
        return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
    }
    perimeter() {
        return this.a + this.b + this.c;
    }
}
// const shape = new Shape()
const circle = new Circle(4);
console.log(circle.describe());
const rectangle = new Rectangle(4, 3);
console.log(rectangle.describe());
const triangle = new Triangle(3, 4, 5);
console.log(triangle.describe());
