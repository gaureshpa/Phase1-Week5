//  Interface

interface User {
    id: number;
    name: string;
    email: string;
    role: "admin" | "viewer" | "editor";
    createdAt: Date;
    avatar?: string;
}

const user1: User = {
    id: 1,
    name: "Merin",
    email: "merin23@gmail.com",
    role: "admin",
    createdAt: new Date()
};

const user2: User = {
    id: 2,
    name: "Ricky",
    email: "ricky23@gmail.com",
    role: "viewer",
    createdAt: new Date(),
    avatar: "ricky.png"
};

const user3 : User = {
    id: 3,
    name: "Harry",
    email: "harrykane@gmail.com",
    role: "viewer",
    createdAt: new Date(),
    avatar: "harry.png"
};

const user4: User = {
    id: 4,
    name: "Jorge",
    email: "jorge32@gmail.com",
    role: "editor",
    createdAt: new Date()
}

const user5: User = {
    id: 5,
    name: "Alvarez",
    email: "alvarez21@gmail.com",
    role: "editor",
    createdAt: new Date()
};


// Readonly

type ReadonlyUser = Readonly<User>
const readonlyUser: ReadonlyUser = user1;
console.log(readonlyUser.name);

// readonlyUser.name = "Merin K";


// Partial + updateUser

function updateUser(
    user: User,
    changes: Partial<User>
): User {
    return {...user, ...changes};
}

const updatedUser = updateUser(user1, {
    name: "Merin K"
});

console.log(updatedUser);


// Interface vs type

interface BasicUser {
    id: number;
    name: string;
}

interface AdminUser extends BasicUser {
    permissions: string[];
}

const admin: AdminUser = {
    id: 10,
    name: "Admin",
    permissions: ["read", "write", "delete"]
};

type BasicUserType = {
    id: number;
    name: string;
};

type AdminUserType = BasicUserType & {
    permissions: string[];
};

const admin2: AdminUserType = {
    id: 11,
    name: "Admin 2",
    permissions: ["read", "write"]
};


console.log(admin);
console.log(admin2);
