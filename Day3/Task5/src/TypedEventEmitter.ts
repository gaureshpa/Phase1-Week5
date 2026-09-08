interface User {
  id: number;
  name: string;
  email: string;
  isAdmin: boolean;
}

type TypedEventListener<Args extends unknown[]> = (...args: Args) => void;

class TypedEventEmitter<Events extends Record<string, unknown[]>> {
    private listeners: {
        [K in keyof Events]? : Array<TypedEventListener<Events[K]>>;
    } = {}

    on<K extends keyof Events>(
        event: K,
        listener: (...args: Events[K]) => void
    ): this {
        const eventListeners = this.listeners[event];

        if (eventListeners) {
            eventListeners.push(listener);
        }
        else {
            this.listeners[event] = [listener];
        }

        return this;
    }

    emit<K extends keyof Events>(
        event: K,
        ...args: Events[K]
    ): boolean {
        const eventListeners = this.listeners[event];

        if(!eventListeners) {
            return false;
        }

        for (const listener of eventListeners) {
            listener(...args);
        }

        return true;
    }
}


type UserEvents = {
    userAdded: [User];
    userRemoved: [string];
    userUpdated: [string, Partial<User>];
}

const emitter = new TypedEventEmitter<UserEvents>();

emitter.on("userAdded", (user)=> {
    console.log("Added:", user.name);
});

emitter.on("userRemoved", (userId)=> {
    console.log("Removed:", userId);
});

emitter.on("userUpdated", (userId, changes) => {
    console.log("Updated", userId, changes);
});

const user: User = {
    id: 1,
    name: "Mbappe",
    email: "mbappe@realmadrid.com",
    isAdmin: true
};

emitter.emit("userAdded", user);
emitter.emit("userRemoved", "user-123");
emitter.emit("userUpdated", "user-123", {name: "Kylian Mbappe"});

// emitter.emit("userAdded", "Mbappe");
// emitter.emit("userRemoved", 123);
// emitter.emit("userUpdated", "user-123");
// emitter.emit("userUpdated", 123, "wrong");
// emitter.emit("userDeleted", "123");

