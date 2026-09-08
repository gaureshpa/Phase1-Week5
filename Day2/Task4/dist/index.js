"use strict";
;
const user = {
    id: 1,
    name: "Mbappe",
    avatar: "mbappe.jpg",
    createdAt: "2026-10-09"
};
console.log(user);
const partialUser = {
    name: "Olise"
};
console.log(partialUser);
const partialProfile = {
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
};
function getValue(obj, key) {
    return obj[key];
}
console.log(getValue(person, "name"));
console.log(getValue(person, "age"));
