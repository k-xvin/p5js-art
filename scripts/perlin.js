import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("harvest");
    let bgColor = tome.get("retro").colors[2];

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);

        //p.background(bgColor);
        p.noiseSeed(99);

        //p.frameRate(10);
        //p.noLoop();
    }

    let t = 0;
    let startX = 0;
    p.draw = function () {
        p.background(palette.colors[4]);
        p.strokeWeight(5);
        p.stroke(palette.colors[0]);
        p.fill(bgColor);

        t = startX;
        p.beginShape();
        p.vertex(0, p.height);
        for(let i=0;i<p.width;i++){
            p.vertex(i, p.noise(startX + t)*p.height);
            t += 0.003;
        }
        p.vertex(p.width, p.height);
        p.endShape();
        startX += 0.005;

        
    }


}

new p5(sketch);