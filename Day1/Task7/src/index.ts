const appEnvironment: string | undefined = process.env.NODE_ENV;

console.log("Environment: ", appEnvironment);

// using the third prty library

import { greet, add, version } from "third-party";

const greeting: string = greet("Mbappe");
const sum: number = add(21, 45);
const libraryVersion: string = version;

console.log(greeting);
console.log(sum);
console.log(libraryVersion);


// using satisfies operator

const palette = {
    primary: "#0D9488"
} satisfies Record<string, string>;

console.log(palette.primary);


// Ambient Declaration

declare const __APP_VERSION__ : string;

console.log("App version:", __APP_VERSION__);
