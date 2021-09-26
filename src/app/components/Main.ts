import { Service } from "typedi";
import * as PIXI from "pixi.js";

import Application from "app/Application";
import KeyboardManager from "managers/KeyboardManager";
import LayerManager from "managers/LayerManager";

@Service()
export class Main {
    private whiteSquare: PIXI.Sprite;
    private redSquare: PIXI.Sprite;
    private greenSquare: PIXI.Sprite;
    private blueSquare: PIXI.Sprite;

    constructor(
        private app: Application,
        private keyboardManager: KeyboardManager,
        private layerManager: LayerManager
    ) {
        this.whiteSquare = this.createSquare("white");
        this.redSquare = this.createSquare("red");
        this.greenSquare = this.createSquare("green");
        this.blueSquare = this.createSquare("blue");

        this.redSquare.position.set(125, 125);
        this.greenSquare.position.set(150, 150);
        this.blueSquare.position.set(175, 175);

        this.app.stage.addChild(
            this.whiteSquare,
            this.redSquare,
            this.greenSquare,
            this.blueSquare
        );

        this.redSquare.parentLayer = this.layerManager.foreground;
        this.greenSquare.parentLayer = this.layerManager.background;
        this.blueSquare.parentLayer = this.layerManager.background;

        this.greenSquare.zOrder = 2;
        this.blueSquare.zOrder = 1;

        this.addKeyboardEvents();
    }

    private createSquare(color: string): PIXI.Sprite {
        const texture = PIXI.utils.TextureCache[`assets/${color}-square.jpg`];

        return new PIXI.Sprite(texture);
    }

    private addKeyboardEvents(): void {
        this.keyboardManager.addEventCallback("ArrowRight", () => {
            this.whiteSquare.x += 2;
        });

        this.keyboardManager.addEventCallback("ArrowLeft", () => {
            this.whiteSquare.x -= 2;
        });

        this.keyboardManager.addEventCallback("ArrowDown", () => {
            this.whiteSquare.y += 2;
        });

        this.keyboardManager.addEventCallback("ArrowUp", () => {
            this.whiteSquare.y -= 2;
        });
    }
}
