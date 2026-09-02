type Listener = (...args: unknown[]) => void;

export class EventEmitter {
  private events: Record<string, Listener[]> = {};

  public on(event: string, listener: Listener): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }

  public off(event: string, listener: Listener): void {
    const listeners: Listener[] | undefined = this.events[event];

    if (!listeners) {
      return;
    }

    this.events[event] = listeners.filter(
      (fn: Listener): boolean => fn !== listener
    );
  }

  public emit(event: string, ...args: unknown[]): void {
    const listeners: Listener[] = this.events[event] ?? [];
    const wildcardListeners: Listener[] = this.events["*"] ?? [];

    for (const listener of listeners) {
      listener(...args);
    }

    for (const listener of wildcardListeners) {
      listener(event, ...args);
    }
  }

  public once(event: string, listener: Listener): void {
    const wrapper: Listener = (...args: unknown[]): void => {
      this.off(event, wrapper);
      listener(...args);
    };

    this.on(event, wrapper);
  }
}

interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "viewer" | "editor";
  createdAt: Date;
  avatar?: string;
}

export class UserStore extends EventEmitter {
  private users: User[] = [];

  public addUser(user: User): void {
    this.users.push(user);
    this.emit("userAdded", user);
  }

  public removeUser(id: number): void {
    const index: number = this.users.findIndex(
      (user: User): boolean => user.id === id
    );

    if (index === -1) {
      return;
    }

    const removedUser: User = this.users.splice(index, 1)[0];

    this.emit("userRemoved", removedUser);
  }

  public updateUser(
    id: number,
    newData: Partial<User>
  ): void {
    const user: User | undefined = this.users.find(
      (user: User): boolean => user.id === id
    );

    if (!user) {
      return;
    }

    Object.assign(user, newData);

    this.emit("userUpdated", user);
  }
}
