export interface CartItem {
    name: string;
    price: number;
    quantity: number;
}

export interface Coupon {
    code: string;
    discount: number;
}

export interface Cart {
    items: CartItem[];
    coupon: number;

    observers: Array<(state: Cart) => void>;
    history: Cart[];

    addObservers(fn: (state: Cart)=> void): void;
    notifyObservers(): void;

    addItem(item: CartItem): Cart;
    removeItem(index: number): Cart;
    updateQuantity(index: number, quantity: number): Cart;
    applyCoupon(code: string): Cart;
    getTotal(): number;
    undo(): Cart;
}

// Implementation of Cart

export class CartModule implements Cart {
    items: CartItem[];
    coupon: number;
    observers: Array<(state: Cart) => void>;
    history: Cart[];

    constructor(
        items: CartItem[] =[],
        coupon: number = 0,
        observers: Array<(state: Cart) => void> = [],
        history: Cart[] = []
    ) {
        this.items = items;
        this.coupon = coupon;
        this.observers = observers;
        this.history = history;
    }

    addObservers(fn: (state: Cart) => void): void {
        if(!this.observers.includes(fn)) {
            this.observers.push(fn);
        }
    }

    notifyObservers(): void {
        this.observers.forEach(
            (observer: (state: Cart) => void): void => {
                observer(this);
            }
        );
    }

    addItem(item: CartItem): Cart {
        const newItems: CartItem[] = [
            ...this.items, item
        ];

        return new CartModule(
            newItems, this.coupon, this.observers, [...this.history, this]
        );
    }

    removeItem(index: number): Cart {
        const newItems: CartItem[] = this.items.filter(
            (_item: CartItem, i: number): boolean => {
                return i !== index;
            }
        );

        return new CartModule(newItems, this.coupon, this.observers, [...this.history, this]);
    }

    updateQuantity(index: number, quantity: number): Cart {
        const newItems: CartItem[] = this.items.map(
            (item: CartItem, i: number): CartItem => {
                if(i === index) {
                    return {
                        ...item,
                        quantity: quantity
                    };
                }

                return item;
            }
        );

        return new CartModule(newItems, this.coupon, this.observers, [...this.history, this]);
    }

    applyCoupon(code: string): Cart {
        let discount: number = 0;

        if (code === "MESSI") {
            discount = 10;
        }

        return new CartModule(
            this.items, discount, this.observers, [...this.history, this]
        );
    }

    getTotal(): number {
        let total: number = 0;
        this.items.forEach(
            (item: CartItem): void => {
                total += item.price * item.quantity;
            }
        );

        return total - (
            total * (this.coupon/100)
        );
    }

    undo(): Cart {
        if (this.history.length === 0) {
            return this;
        }

        return this.history[this.history.length-1];
    }
}

