import * as PIXI from "pixi.js";

export default class KeyboardManager {
    static readonly DOWN_EVENT = "down";
    static readonly UP_EVENT = "up";

    private pressedKeys: { [key: string]: boolean } = {};
    private downCallbacks: { [key: string]: Array<() => void> } = {};
    private upCallbacks: { [key: string]: Array<() => void> } = {};
    private downListener: () => void;
    private upListener: () => void;

    constructor() {
        this.downListener = this.downHandler.bind(this);
        this.upListener = this.upHandler.bind(this);

        window.addEventListener("keydown", this.downListener, false);
        window.addEventListener("keyup", this.upListener, false);

        PIXI.Ticker.shared.add(this.update, this);
    }

    /**
     * Adds event callback to a key event.
     *
     * @param {string} key - The key code.
     * @param {string} callback - The callback function to add
     * @param {string} [eventType=KeyboardManager.DOWN_EVENT] - The type of the event to which to attach the callback
     *
     * @returns {boolean} - Whether or not the removal was successful
     */
    addEventCallback(
        key: string,
        callback: () => void,
        eventType = KeyboardManager.DOWN_EVENT
    ): boolean {
        if (eventType === KeyboardManager.DOWN_EVENT) {
            if (!this.downCallbacks[key]) {
                this.downCallbacks[key] = [];
            }

            this.downCallbacks[key].push(callback);
        } else {
            if (!this.upCallbacks[key]) {
                this.upCallbacks[key] = [];
            }

            this.upCallbacks[key].push(callback);
        }

        return true;
    }

    /**
     * Removes event callback from a key event.
     *
     * @param {string} key - The key code.
     * @param {string} callback - The callback function to remove
     * @param {string} [eventType=KeyboardManager.DOWN_EVENT] - The type of the event to which the callback is attached
     *
     * @returns {boolean} - Whether or not the removal was successful
     */
    removeEventCallback(
        key: string,
        callback: () => void,
        eventType = KeyboardManager.DOWN_EVENT
    ): boolean {
        if (eventType === KeyboardManager.DOWN_EVENT) {
            if (!this.downCallbacks[key]) {
                return false;
            }

            const index = this.downCallbacks[key].indexOf(callback);

            if (index > -1) {
                this.downCallbacks[key].splice(index, 1);
                return true;
            }
        } else {
            if (this.upCallbacks[key]) {
                return false;
            }

            const index = this.upCallbacks[key].indexOf(callback);

            if (index > -1) {
                this.upCallbacks[key].splice(index, 1);
                return true;
            }
        }

        return false;
    }

    /**
     * Destroys the keyboard manager and removes all listeners.
     */
    destroy(): void {
        window.removeEventListener("keydown", this.downListener);
        window.removeEventListener("keyup", this.upListener);
    }

    private downHandler(event: KeyboardEvent): void {
        this.pressedKeys[event.key] = true;
    }

    private upHandler(event: KeyboardEvent): void {
        this.pressedKeys[event.key] = false;

        const callbacks = this.upCallbacks[event.key];
        this.executeCallbacks(callbacks);
    }

    private update() {
        for (const [key, value] of Object.entries(this.pressedKeys)) {
            if (!value) {
                continue;
            }

            const callbacks = this.downCallbacks[key];
            this.executeCallbacks(callbacks);
        }
    }

    private executeCallbacks(callbacks: Array<() => void>): void {
        if (!callbacks) {
            return;
        }

        for (const callback of callbacks) {
            callback();
        }
    }
}
