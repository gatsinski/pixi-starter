import { Service } from "typedi";
import * as PIXI from "pixi.js";

import KeyboardManager from "../managers/KeyboardManager";
import Application from "../Application";

@Service()
export class Main {
    private sprite: PIXI.Sprite;

    constructor(
        private app: Application,
        private keyboardManager: KeyboardManager
    ) {
        const texture = PIXI.utils.TextureCache["assets/white-square.jpg"];

        this.sprite = new PIXI.Sprite(texture);

        this.app.stage.addChild(this.sprite);

        this.addKeyboardEvents();
    }

    private addKeyboardEvents(): void {
        this.keyboardManager.addEventCallback("ArrowRight", () => {
            this.sprite.x += 2;
        });

        this.keyboardManager.addEventCallback("ArrowLeft", () => {
            this.sprite.x -= 2;
        });

        this.keyboardManager.addEventCallback("ArrowDown", () => {
            this.sprite.y += 2;
        });

        this.keyboardManager.addEventCallback("ArrowUp", () => {
            this.sprite.y -= 2;
        });
    }
}
