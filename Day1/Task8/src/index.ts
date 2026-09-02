// noImplicitAny

function greet(name: string) {
    return `Hello ${name}`;
}

console.log(greet("Mbappe"));

// strictNullChecks

function findUser(): string | undefined {
    return undefined;
}

// const user: string = findUser();

const user: string | undefined = findUser();

if(user !== undefined) {
    console.log("User:", user);
}
else {
    console.log("User not found");
}


// strictFunctionTypes

interface Animal {
    name: string;
}

interface Dog extends Animal {
    bark(): void;
}

const handleAnimal = (animal: Animal): void => {
    console.log(animal.name);
};

const animalHandler: (animal: Animal) => void = handleAnimal;

animalHandler({
    name: "Cat"
});


// noUncheckedIndexedAccess

const numbers: number[] = [];
// const first: number = numbers[0];

const first: number | undefined = numbers[0];

if (first !== undefined) {
    console.log("First number:", first);
}
else {
    console.log("Array is empty");
}