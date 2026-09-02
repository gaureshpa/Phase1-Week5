"use strict";
//  Interface
const user1 = {
    id: 1,
    name: "Merin",
    email: "merin23@gmail.com",
    role: "admin",
    createdAt: new Date()
};
const user2 = {
    id: 2,
    name: "Ricky",
    email: "ricky23@gmail.com",
    role: "viewer",
    createdAt: new Date(),
    avatar: "ricky.png"
};
const user3 = {
    id: 3,
    name: "Harry",
    email: "harrykane@gmail.com",
    role: "viewer",
    createdAt: new Date(),
    avatar: "harry.png"
};
const user4 = {
    id: 4,
    name: "Jorge",
    email: "jorge32@gmail.com",
    role: "editor",
    createdAt: new Date()
};
const user5 = {
    id: 5,
    name: "Alvarez",
    email: "alvarez21@gmail.com",
    role: "editor",
    createdAt: new Date()
};
const readonlyUser = user1;
console.log(readonlyUser.name);
// readonlyUser.name = "Merin K";
// Partial + updateUser
function updateUser(user, changes) {
    return { ...user, ...changes };
}
const updatedUser = updateUser(user1, {
    name: "Merin K"
});
console.log(updatedUser);
const admin = {
    id: 10,
    name: "Admin",
    permissions: ["read", "write", "delete"]
};
const admin2 = {
    id: 11,
    name: "Admin 2",
    permissions: ["read", "write"]
};
console.log(admin);
console.log(admin2);
