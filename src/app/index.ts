import "reflect-metadata";

import * as PIXI from "pixi.js";
import { Container } from "typedi";

import { Main } from "./components/Main";

const app = new PIXI.Application({ width: 1280, height: 768 });

document.body.appendChild(app.view);

const loader = PIXI.Loader.shared;

loader.add("assets/white-square.jpg").load(setup);

function setup() {
    const main = Container.get(Main);

    main.init(app);
}
