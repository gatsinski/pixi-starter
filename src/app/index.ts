import "reflect-metadata";

import * as PIXI from "pixi.js";
import { Container } from "typedi";

import { Main } from "./components/Main";

const loader = PIXI.Loader.shared;

loader.add("assets/white-square.jpg").load(setup);

function setup() {
    Container.get(Main);
}
