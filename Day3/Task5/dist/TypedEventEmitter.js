"use strict";
class TypedEventEmitter {
    listeners = {};
    on(event, listener) {
        const eventListeners = this.listeners[event];
        if (eventListeners) {
            eventListeners.push(listener);
        }
        else {
            this.listeners[event] = [listener];
        }
        return this;
    }
    emit(event, ...args) {
        const eventListeners = this.listeners[event];
        if (!eventListeners) {
            return false;
        }
        for (const listener of eventListeners) {
            listener(...args);
        }
        return true;
    }
}
const emitter = new TypedEventEmitter();
emitter.on("userAdded", (user) => {
    console.log("Added:", user.name);
});
emitter.on("userRemoved", (userId) => {
    console.log("Removed:", userId);
});
emitter.on("userUpdated", (userId, changes) => {
    console.log("Updated", userId, changes);
});
const user = {
    id: 1,
    name: "Mbappe",
    email: "mbappe@realmadrid.com",
    isAdmin: true
};
emitter.emit("userAdded", user);
emitter.emit("userRemoved", "user-123");
emitter.emit("userUpdated", "user-123", { name: "Kylian Mbappe" });
// emitter.emit("userAdded", "Mbappe");
// emitter.emit("userRemoved", 123);
// emitter.emit("userUpdated", "user-123");
// emitter.emit("userUpdated", 123, "wrong");
// emitter.emit("userDeleted", "123");
