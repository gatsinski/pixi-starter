import { Service } from "typedi";
import { Layer } from "@pixi/layers";

import Application from "../Application";

@Service()
export default class LayerManager {
    public background: Layer;
    public foreground: Layer;

    constructor(private app: Application) {
        this.background = new Layer();
        this.background.group.enableSort = true;

        this.foreground = new Layer();
        this.foreground.group.enableSort = true;

        this.app.stage.addChild(this.background, this.foreground);
    }
}
