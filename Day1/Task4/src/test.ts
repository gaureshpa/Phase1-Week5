import debounce from "./debounce.js";
import { fetchJSON } from "./fetchJSON.js";
import { memoize } from "./memoize.js";
import { pipe } from "./pipe.js";
import { EventEmitter, UserStore } from "./EventEmitter.js";


// Debounce
const sayHello = (name: string): void => {
    console.log(`Hello ${name}`);
};

const debouncedHello = debounce(sayHello, 1000);
debouncedHello("Mbappe");
debouncedHello("Messi");
debouncedHello("Suarez");


// Memoize
const add = memoize((a: number, b: number): number => {
  console.log("Calculating...");
  return a + b;
});

console.log("Memoize:", add(2, 3));
console.log("Memoize:", add(2, 3));


// Pipe

const double = (value: number): number => value * 2;
const addTen = (value: number): number => value + 10;
const process = pipe(double, addTen);

console.log("Pipe: ", process(5));


// EventEmitter

const emitter = new EventEmitter();

const listener = (...args: unknown[]): void => {
  console.log("Event received:", args);
};

emitter.on("message", listener);

emitter.emit("message", "Hello", 123);

emitter.off("message", listener);

emitter.emit("message", "This should NOT appear");

emitter.once("login", (...args: unknown[]): void => {
  console.log("Login:", args);
});

emitter.emit("login", "Mbappe");
emitter.emit("login", "Kyllian Mbappe");


// UserStore

const store = new UserStore();

store.on("userRemoved", (...args: unknown[]): void => {
    console.log("User removed: ", args);
});

const user = {
    id: 1,
    name: "Mbappe",
    email: "mbappe@realmadrid.com",
    role: "admin" as const,
    createdAt: new Date()
}

store.addUser(user);
store.removeUser(1);


// fetchJSON

interface Post {
    id: number;
    title: string;
}

const testFetch = async () : Promise<void> => {
    try {
        const post = await fetchJSON<Post>(
            "https://jsonplaceholder.typicode.com/posts/1"
        );

        console.log("Fetched post: ", post.id, post.title);
    }
    catch(error: unknown) {
        console.error("Fetch failed: ", error);
    }
};

void testFetch();
