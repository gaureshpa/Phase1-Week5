// Interface Merging

interface User {
    id: number;
    name: string;
}

interface User {
    email: string;
    isAdmin: boolean;
}

type AppState = {
    user: User | null;
    theme: "light" | "dark";
    isLoggedIn: boolean;
}

const user: User = {
    id: 1,
    name: "Mbappe",
    email: "mbappe@realmadrid.com",
    isAdmin: true
}

console.log(user);

// Array Augmentation

Array.prototype.sum = function (): number {
    return (this as number[]).reduce(
        (total, value) => total + value, 0
    );
};

const numbers = [10, 20, 30, 40];

console.log(numbers.sum());

// Window augmentation

if(typeof window !== "undefined") {
    window.appState = {
        user,
        theme: "dark",
        isLoggedIn: true
    };

    console.log(window.appState);
}
