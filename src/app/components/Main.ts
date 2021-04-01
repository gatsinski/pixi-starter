import { Service, Inject } from "typedi";
import * as PIXI from "pixi.js";

import KeyboardManager from "../managers/KeyboardManager";

@Service()
export class Main {
    @Inject()
    private keyboardManager: KeyboardManager;

    private sprite: PIXI.Sprite;

    public init(app: PIXI.Application): void {
        const texture = PIXI.utils.TextureCache["assets/white-square.jpg"];

        this.sprite = new PIXI.Sprite(texture);

        app.stage.addChild(this.sprite);

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
