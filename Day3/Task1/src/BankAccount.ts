class BankAccount {
    #hashPrivate: string;

    constructor(
        private balance: number,
        public readonly owner: string
    ) {
        this.#hashPrivate = "secret-hash";
    }

    public getBalance(): number {
        return this.balance
    }

    protected transfer(amount: number): void {
        if(amount <= 0) {
            throw new Error("Transfer amount must be greater than zero");
        }

        if (amount>this.balance) {
            throw new Error("Insufficient balance");
        }

        this.balance -= amount;
    }

    public deposit(amount: number): void {
        if(amount <= 0){
            throw new Error("Deposit must be greater than zero");
        }

        this.balance += amount;
    }

    public getHashPrivate(): string {
        return this.#hashPrivate;
    }
}


class SavingsAccount extends BankAccount {
    public withdrawForSavings(amount: number): void {
        this.transfer(amount);
    }
}

const account = new BankAccount(1000, "Martin");

console.log(account.owner);
console.log(account.getBalance());

account.deposit(500);

console.log(account.getBalance())


const savings = new SavingsAccount(4000, "Bevin");
savings.withdrawForSavings(500);
console.log(savings.getBalance());
