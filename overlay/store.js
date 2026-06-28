// overlay/store.js

class Store {
    constructor() {
        this.state = {};
        this.listeners = [];
    }

    getState() {
        return this.state;
    }

    setState(newState) {
        // Simple immutable merge for top level keys
        this.state = { ...this.state, ...newState };
        this.notify();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notify() {
        for (const listener of this.listeners) {
            listener(this.state);
        }
    }
}

export const store = new Store();
