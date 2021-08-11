import * as PIXI from "pixi.js";
import { Service } from "typedi";

@Service()
export default class Application extends PIXI.Application {
    constructor() {
        super({ width: 1280, height: 768 });

        document.body.appendChild(this.view);
    }
}
