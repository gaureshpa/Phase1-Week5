"use strict";
class BankAccount {
    balance;
    owner;
    #hashPrivate;
    constructor(balance, owner) {
        this.balance = balance;
        this.owner = owner;
        this.#hashPrivate = "secret-hash";
    }
    getBalance() {
        return this.balance;
    }
    transfer(amount) {
        if (amount <= 0) {
            throw new Error("Transfer amount must be greater than zero");
        }
        if (amount > this.balance) {
            throw new Error("Insufficient balance");
        }
        this.balance -= amount;
    }
    deposit(amount) {
        if (amount <= 0) {
            throw new Error("Deposit must be greater than zero");
        }
        this.balance += amount;
    }
    getHashPrivate() {
        return this.#hashPrivate;
    }
}
class SavingsAccount extends BankAccount {
    withdrawForSavings(amount) {
        this.transfer(amount);
    }
}
const account = new BankAccount(1000, "Martin");
console.log(account.owner);
console.log(account.getBalance());
account.deposit(500);
console.log(account.getBalance());
const savings = new SavingsAccount(4000, "Bevin");
savings.withdrawForSavings(500);
console.log(savings.getBalance());
