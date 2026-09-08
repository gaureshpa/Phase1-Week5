"use strict";
class Documents {
    title;
    content;
    constructor(title, content) {
        this.title = title;
        this.content = content;
    }
    toJSON() {
        return JSON.stringify({
            title: this.title,
            content: this.content
        });
    }
    fromJSON(data) {
        const parsed = JSON.parse(data);
        this.title = parsed.title;
        this.content = parsed.content;
        return this;
    }
    print() {
        console.log(this.content);
    }
    getDisplayName() {
        return this.title;
    }
    validate() {
        const errors = [];
        if (this.title.trim() === "") {
            errors.push("Title is required");
        }
        if (this.content.trim() === "") {
            errors.push("Content is required");
        }
        return {
            valid: errors.length === 0, errors
        };
    }
}
const doc = new Documents("Test Document", "Test Document content");
console.log(doc.getDisplayName());
doc.print();
console.log(doc.validate());
const json = doc.toJSON();
console.log(json);
const restored = new Documents("", "").fromJSON(json);
console.log(restored);
const plainObject = {
    toJSON() {
        return JSON.stringify({ message: "Hello" });
    },
    fromJSON(data) {
        console.log("Received:", data);
        return this;
    }
};
const serializable = plainObject;
console.log(serializable.toJSON());
