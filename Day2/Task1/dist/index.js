"use strict";
// identity<T>
function identity(arg) {
    return arg;
}
const playerName = identity("Mbappe");
const age = identity(27);
const user = identity({
    id: 1,
    name: "Mbappe"
});
console.log(playerName);
console.log(age);
console.log(user);
// first<T>
function first(arr) {
    return arr[0];
}
const firstName = first(["Mbappe", "Olise", "Mateta"]);
console.log(firstName);
const firstNum = first([10, 20, 30]);
console.log(firstNum);
const users = [
    { id: 1, name: "Mbappe" },
    { id: 2, name: "Olise" }
];
const firstUser = first(users);
console.log(firstUser);
// fetchData<T>
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
// getProperty<T, K extends keyof T>
function getProperty(obj, key) {
    return obj[key];
}
const person = {
    id: 10,
    name: "Mbappe"
};
const personId = getProperty(person, "id");
const personName = getProperty(person, "name");
console.log(personId);
console.log(personName);
// Queue<T>
class Queue {
    items = [];
    enqueue(item) {
        this.items.push(item);
    }
    dequeue() {
        return this.items.shift();
    }
    peek() {
        return this.items[0];
    }
    isEmpty() {
        return this.items.length === 0;
    }
}
const numQueue = new Queue();
numQueue.enqueue(1);
numQueue.enqueue(2);
numQueue.enqueue(3);
console.log(numQueue.peek());
console.log(numQueue.dequeue());
console.log(numQueue.peek());
console.log(numQueue.dequeue());
console.log(numQueue.dequeue());
console.log("Is Empty:", numQueue.isEmpty());
