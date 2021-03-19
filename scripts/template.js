import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("dt09");
    //let bgColor = tome.get("floratopia").colors[3];
    let bgColor = tome.get("retro").colors[2];
    //let bgColor = "#EFEBDA"; // from dt09 on the website
    console.log(palette.colors);

    p.setup = function () {
        // set up canvas and brush
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.background(bgColor);
        p.fill(255);

    }

    // draw that stuff
    p.draw = function () {
        // reset frame
        p.background(bgColor);

    }


}

new p5(sketch);