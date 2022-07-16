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
    let startX = 0;
    let endX = 0;
    let length = 60;
    let speed = 10;
    let offset = 0;
    let reverse = false;
    p.draw = function () {
        // reset frame
        p.background(bgColor);


        if (endX + length > p.width) {
            reverse = true;
        }
        if (endX < 0) {
            reverse = false;
        }

        if (reverse) {
            startX -= speed;
            endX -= speed;
        } else {
            startX += speed;
            endX += speed;
        }

        // draw a bunch of lines
        for (let i = 0; i < 25; i++) {
            p.stroke((i % 2 == 0) ? palette.colors[1] : palette.colors[0]);
            p.strokeWeight(20);
            p.line(startX, 30 + 30 * i, endX + length, 30 + 30 * i);

        }

    }


}

new p5(sketch);