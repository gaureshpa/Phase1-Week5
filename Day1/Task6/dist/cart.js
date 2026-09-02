// Implementation of Cart
export class CartModule {
    items;
    coupon;
    observers;
    history;
    constructor(items = [], coupon = 0, observers = [], history = []) {
        this.items = items;
        this.coupon = coupon;
        this.observers = observers;
        this.history = history;
    }
    addObservers(fn) {
        if (!this.observers.includes(fn)) {
            this.observers.push(fn);
        }
    }
    notifyObservers() {
        this.observers.forEach((observer) => {
            observer(this);
        });
    }
    addItem(item) {
        const newItems = [
            ...this.items, item
        ];
        return new CartModule(newItems, this.coupon, this.observers, [...this.history, this]);
    }
    removeItem(index) {
        const newItems = this.items.filter((_item, i) => {
            return i !== index;
        });
        return new CartModule(newItems, this.coupon, this.observers, [...this.history, this]);
    }
    updateQuantity(index, quantity) {
        const newItems = this.items.map((item, i) => {
            if (i === index) {
                return {
                    ...item,
                    quantity: quantity
                };
            }
            return item;
        });
        return new CartModule(newItems, this.coupon, this.observers, [...this.history, this]);
    }
    applyCoupon(code) {
        let discount = 0;
        if (code === "MESSI") {
            discount = 10;
        }
        return new CartModule(this.items, discount, this.observers, [...this.history, this]);
    }
    getTotal() {
        let total = 0;
        this.items.forEach((item) => {
            total += item.price * item.quantity;
        });
        return total - (total * (this.coupon / 100));
    }
    undo() {
        if (this.history.length === 0) {
            return this;
        }
        return this.history[this.history.length - 1];
    }
}
