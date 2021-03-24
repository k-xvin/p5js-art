import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("dt09");
    let bgColor = palette.background;

  
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.background(bgColor);
    }


    p.draw = function () {
        //p.background(bgColor);
    }

}

new p5(sketch);