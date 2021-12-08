import * as PIXI from "pixi.js";
import { Stage } from "@pixi/layers";
import { Service } from "typedi";

@Service()
export default class Application extends PIXI.Application {
    public get center(): PIXI.Point {
        const x = this.renderer.width / 2;
        const y = this.renderer.height / 2;

        return new PIXI.Point(x, y);
    }

    constructor() {
        super({ width: 1280, height: 768 });

        this.stage = new Stage();

        document.body.appendChild(this.view);
    }
}
