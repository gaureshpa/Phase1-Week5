interface User {
    id: number;
    name: string;
    avatar: string;
    createdAt: string;
};

// MyReadonly<T>

type MyReadonly<T> = {
    readonly [K in keyof T]: T[K];
}

const user: MyReadonly<User> = {
    id: 1, 
    name: "Mbappe",
    avatar: "mbappe.jpg",
    createdAt: "2026-10-09"
}

console.log(user);


// MyPartial<T>

type MyPartial<T> = {
    [K in keyof T]?: T[K];
}

const partialUser: MyPartial<User> = {
    name: "Olise"
};

console.log(partialUser);


// DeepPartial<T>

type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object
        ? DeepPartial<T[K]>
        : T[K];
}

interface Profile {
    name: string;
    address: {
        city: string;
        country: string;
    };
}

const partialProfile: DeepPartial<Profile> = {
    address: {
        city: "Paris"
    }
};

console.log(partialProfile);


// keyof + typeof

const person = {
    id: 1,
    name: "Mbappe",
    age: 27
}

type Person = typeof person;
type PersonKey = keyof Person;

function getValue(obj: Person, key: PersonKey) {
    return obj[key];
}

console.log(getValue(person, "name"));
console.log(getValue(person, "age"));
