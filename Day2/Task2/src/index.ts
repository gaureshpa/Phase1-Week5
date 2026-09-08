interface User {
    id: number;
    name: string;
    avatar: string;
    createdAt: string;
}

// updateUser

async function updateUser(
    id: string,
    changes: Partial<User>
): Promise<User> {
    const user: User = {
        id: Number(id),
        name: "Mbappe",
        avatar: "mbappe.jpg",
        createdAt: "2026-09-01"
    };

    return {...user, ...changes};
}

updateUser("1", {name: "Kyllian Mbappe"}).then(user => {
    console.log(user);
});


// Required<User>

function createRequiredUser(data: Required<User>): User {
    return data;
}

const newUser = createRequiredUser({
    id: 2,
    name: "Alvarez",
    avatar: "alvarez.jpeg",
    createdAt: "2026-08-01"
});

console.log(newUser);


// Pick<User, 'id' | 'name' | 'avatar'>

type UserPreview = Pick<User, "id" | "name" | "avatar">;

const preview: UserPreview = {
    id: 1,
    name: "Mbappe",
    avatar: "mbappe.jpg"
};

console.log(preview);


// Omit<User, 'id' | 'createdAt'>

type UserInput = Omit<User, "id" | "createdAt">

const userInput: UserInput = {
    name: "Felipe", 
    avatar: "felipe.jpg"
};

console.log(userInput);


// Record<ConfigKey, string>

type ConfigKey = "apiUrl" | "apiKey" | "environment";

const config: Record<ConfigKey, string> = {
    apiUrl: "https://api.premierleague.com",
    apiKey: "fbkwfhi22r4",
    environment: "dev"
};

console.log(config);
