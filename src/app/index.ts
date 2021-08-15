import "reflect-metadata";

import * as PIXI from "pixi.js";
import { Container } from "typedi";

import { Main } from "./components/Main";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(window as any).PIXI = PIXI;

const loader = PIXI.Loader.shared;

loader.add("assets/white-square.jpg").load(setup);

function setup() {
    Container.get(Main);
}
