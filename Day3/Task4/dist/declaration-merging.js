"use strict";
// Interface Merging
const user = {
    id: 1,
    name: "Mbappe",
    email: "mbappe@realmadrid.com",
    isAdmin: true
};
console.log(user);
// Array Augmentation
Array.prototype.sum = function () {
    return this.reduce((total, value) => total + value, 0);
};
const numbers = [10, 20, 30, 40];
console.log(numbers.sum());
// Window augmentation
if (typeof window !== "undefined") {
    window.appState = {
        user,
        theme: "dark",
        isLoggedIn: true
    };
    console.log(window.appState);
}
