import * as PIXI from "pixi.js";

const app = new PIXI.Application({ width: 256, height: 256 });

document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;

loader.add("assets/contuga-logo.png").load(setup);

function setup() {
    const texture = PIXI.utils.TextureCache["assets/white-square.jpg"];
    const sprite = new PIXI.Sprite(texture);

    app.stage.addChild(sprite);
}
