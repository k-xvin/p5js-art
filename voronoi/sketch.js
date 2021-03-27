import { tome } from "../../node_modules/chromotome/dist/index.esm.js"
import { Delaunay } from "../../node_modules/d3-delaunay/dist/d3-delaunay.js";

let sketch = function (p) {

    let palette = tome.get("olympia");
    let bgColor = palette.background;


    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.background(bgColor);
    }


    p.draw = function () {
        p.background(bgColor);
    }

    function genSeeds() {

    }

}

new p5(sketch);