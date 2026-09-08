interface Observer<T> {
    next(value: T): void;
}

type Unsubscribe = () => void;

interface Observervable<T> {
    subscribe(observer: Observer<T>): Unsubscribe;
}

class Subject<T> implements Observervable<T> {
    private observers: Observer<T>[] = [];

    public subscribe(observer: Observer<T>): Unsubscribe {
        this.observers.push(observer);

        return (): void => {
            this.observers = this.observers.filter(
                (item: Observer<T>): boolean => item !== observer       
            );
        };
    }


    public next(value: T): void {
        for (const observer of this.observers) {
            observer.next(value);
        }
    }
}


interface Command {
    execute(): void;
    undo(): void;
}

class CommandHistory {
    private undoStack: Command[] = [];
    private redoStack: Command[] = [];

    public execute(command: Command): void {
        command.execute();
        this.undoStack.push(command);
        this.redoStack = [];
    }

    public undo(): void {
        const command = this.undoStack.pop();

        if(command === undefined) {
            return;
        }

        command.undo();
        this.redoStack.push(command);
    }


    public redo(): void {
        const command = this.redoStack.pop();

        if(command === undefined) {
            return;
        }

        command.execute();
        this.undoStack.push(command);
    }
}


class AddCommand implements Command {
    constructor(
        private values: number[],
        private value: number
    ) {}

    public execute(): void {
        this.values.push(this.value);
    }

    public undo(): void {
        this.values.pop();
    }
}


const numbers = new Subject<number>();

const unsubscribe = numbers.subscribe({
    next(value: number): void {
        console.log("Received", value);
    }
});

numbers.next(10);
numbers.next(20);
numbers.next(30);

unsubscribe();

numbers.next(40);

// CommandHistory test

const values: number[] = [];
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
