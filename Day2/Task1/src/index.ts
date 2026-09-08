// identity<T>

function identity<T>(arg: T): T {
    return arg;
}

interface User {
    id: number,
    name: string
}

const playerName = identity<string>("Mbappe");
const age = identity<number>(27);
const user = identity<User>({
    id: 1,
    name: "Mbappe"
});

console.log(playerName);
console.log(age);
console.log(user);


// first<T>

function first<T>(arr: T[]): T | undefined{
    return arr[0]
}

const firstName: string | undefined = first(["Mbappe", "Olise", "Mateta"]);
console.log(firstName);

const firstNum: number | undefined = first([10, 20, 30]);
console.log(firstNum);

const users: User[] = [
    {id: 1, name: "Mbappe"},
    {id: 2, name: "Olise"}
]

const firstUser: User | undefined = first(users);
console.log(firstUser);


// fetchData<T>

async function fetchData<T>(url: string): Promise<T> {
    const response: Response = await fetch(url);
    const data: unknown = await response.json();
    return data as T;
}

// getProperty<T, K extends keyof T>

function getProperty<T, K extends keyof T>(
    obj: T,
    key: K
): T[K] {
    return obj[key];
}

const person: User = {
    id: 10,
    name: "Mbappe"
};

const personId: number = getProperty(person, "id");
const personName: string = getProperty(person, "name");

console.log(personId);
console.log(personName);


// Queue<T>

class Queue<T> {
    private items: T[] =[];

    enqueue(item: T): void {
        this.items.push(item);
    }

    dequeue(): T | undefined {
        return this.items.shift();
    }

    peek(): T | undefined {
        return this.items[0];
    }
    isEmpty(): boolean {
        return this.items.length === 0;
    }
}

const numQueue = new Queue<number>();

numQueue.enqueue(1);
numQueue.enqueue(2);
numQueue.enqueue(3);

console.log(numQueue.peek());
console.log(numQueue.dequeue());
console.log(numQueue.peek());

console.log(numQueue.dequeue());
console.log(numQueue.dequeue());
console.log("Is Empty:", numQueue.isEmpty());
