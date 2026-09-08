"use strict";
class Subject {
    observers = [];
    subscribe(observer) {
        this.observers.push(observer);
        return () => {
            this.observers = this.observers.filter((item) => item !== observer);
        };
    }
    next(value) {
        for (const observer of this.observers) {
            observer.next(value);
        }
    }
}
class CommandHistory {
    undoStack = [];
    redoStack = [];
    execute(command) {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = [];
    }
    undo() {
        const command = this.undoStack.pop();
        if (command === undefined) {
            return;
        }
        command.undo();
        this.redoStack.push(command);
    }
    redo() {
        const command = this.redoStack.pop();
        if (command === undefined) {
            return;
        }
        command.execute();
        this.undoStack.push(command);
    }
}
class AddCommand {
    values;
    value;
    constructor(values, value) {
        this.values = values;
        this.value = value;
    }
    execute() {
        this.values.push(this.value);
    }
    undo() {
        this.values.pop();
    }
}
const numbers = new Subject();
const unsubscribe = numbers.subscribe({
    next(value) {
        console.log("Received", value);
    }
});
numbers.next(10);
numbers.next(20);
numbers.next(30);
unsubscribe();
numbers.next(40);
// CommandHistory test
const values = [];
const commandHistory = new CommandHistory();
commandHistory.execute(new AddCommand(values, 10));
commandHistory.execute(new AddCommand(values, 20));
commandHistory.execute(new AddCommand(values, 30));
commandHistory.execute(new AddCommand(values, 40));
commandHistory.execute(new AddCommand(values, 50));
console.log(values);
commandHistory.undo();
commandHistory.undo();
commandHistory.undo();
commandHistory.undo();
commandHistory.undo();
console.log(values);
commandHistory.redo();
commandHistory.redo();
console.log(values); //[10, 20]
