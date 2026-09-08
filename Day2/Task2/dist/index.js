"use strict";
// updateUser
async function updateUser(id, changes) {
    const user = {
        id: Number(id),
        name: "Mbappe",
        avatar: "mbappe.jpg",
        createdAt: "2026-09-01"
    };
    return { ...user, ...changes };
}
updateUser("1", { name: "Kyllian Mbappe" }).then(user => {
    console.log(user);
});
// Required<User>
function createRequiredUser(data) {
    return data;
}
const newUser = createRequiredUser({
    id: 2,
    name: "Alvarez",
    avatar: "alvarez.jpeg",
    createdAt: "2026-08-01"
});
console.log(newUser);
const preview = {
    id: 1,
    name: "Mbappe",
    avatar: "mbappe.jpg"
};
console.log(preview);
const userInput = {
    name: "Felipe",
    avatar: "felipe.jpg"
};
console.log(userInput);
const config = {
    apiUrl: "https://api.premierleague.com",
    apiKey: "fbkwfhi22r4",
    environment: "dev"
};
console.log(config);
