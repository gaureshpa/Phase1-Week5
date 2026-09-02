import debounce from "./debounce.js";
import { fetchJSON } from "./fetchJSON.js";
import { memoize } from "./memoize.js";
import { pipe } from "./pipe.js";
import { EventEmitter, UserStore } from "./EventEmitter.js";
// Debounce
const sayHello = (name) => {
    console.log(`Hello ${name}`);
};
const debouncedHello = debounce(sayHello, 1000);
debouncedHello("Mbappe");
debouncedHello("Messi");
debouncedHello("Suarez");
// Memoize
const add = memoize((a, b) => {
    console.log("Calculating...");
    return a + b;
});
console.log("Memoize:", add(2, 3));
console.log("Memoize:", add(2, 3));
// Pipe
const double = (value) => value * 2;
const addTen = (value) => value + 10;
const process = pipe(double, addTen);
console.log("Pipe: ", process(5));
// EventEmitter
const emitter = new EventEmitter();
const listener = (...args) => {
    console.log("Event received:", args);
};
emitter.on("message", listener);
emitter.emit("message", "Hello", 123);
emitter.off("message", listener);
emitter.emit("message", "This should NOT appear");
emitter.once("login", (...args) => {
    console.log("Login:", args);
});
emitter.emit("login", "Mbappe");
emitter.emit("login", "Kyllian Mbappe");
// UserStore
const store = new UserStore();
store.on("userRemoved", (...args) => {
    console.log("User removed: ", args);
});
const user = {
    id: 1,
    name: "Mbappe",
    email: "mbappe@realmadrid.com",
    role: "admin",
    createdAt: new Date()
};
store.addUser(user);
store.removeUser(1);
const testFetch = async () => {
    try {
        const post = await fetchJSON("https://jsonplaceholder.typicode.com/posts/1");
        console.log("Fetched post: ", post.id, post.title);
    }
    catch (error) {
        console.error("Fetch failed: ", error);
    }
};
void testFetch();
