export class EventEmitter {
    events = {};
    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }
    off(event, listener) {
        const listeners = this.events[event];
        if (!listeners) {
            return;
        }
        this.events[event] = listeners.filter((fn) => fn !== listener);
    }
    emit(event, ...args) {
        const listeners = this.events[event] ?? [];
        const wildcardListeners = this.events["*"] ?? [];
        for (const listener of listeners) {
            listener(...args);
        }
        for (const listener of wildcardListeners) {
            listener(event, ...args);
        }
    }
    once(event, listener) {
        const wrapper = (...args) => {
            this.off(event, wrapper);
            listener(...args);
        };
        this.on(event, wrapper);
    }
}
export class UserStore extends EventEmitter {
    users = [];
    addUser(user) {
        this.users.push(user);
        this.emit("userAdded", user);
    }
    removeUser(id) {
        const index = this.users.findIndex((user) => user.id === id);
        if (index === -1) {
            return;
        }
        const removedUser = this.users.splice(index, 1)[0];
        this.emit("userRemoved", removedUser);
    }
    updateUser(id, newData) {
        const user = this.users.find((user) => user.id === id);
        if (!user) {
            return;
        }
        Object.assign(user, newData);
        this.emit("userUpdated", user);
    }
}
