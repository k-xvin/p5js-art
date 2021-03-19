import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("retro");
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

    p.windowResized = function() {
        //console.log("resized!");
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.background(bgColor);
    }

    // draw that stuff
    let speed = 0;
    p.draw = function () {
        // reset frame
        //p.background(bgColor);

        // put in center
        speed += 10;
        //p.translate((p.width / 2) + speed, (p.height / 2));
        p.translate(speed, (p.height / 2));

        // p.fill((palette.colors[1]));
        // p.noStroke();
        // p.circle(0, 0, 120);

        // p.fill(bgColor);
        // p.noStroke();
        // p.circle(0, 0, 80);
        let v1;
        for (let i = 0; i < 360; i++) {
            v1 = p5.Vector.fromAngle(p.radians(i), 500);
            p.stroke(palette.colors[p.round(p.random(0,palette.colors.length-1))]);
            p.strokeWeight(5);
            p.line(0, 0, v1.x, v1.y);
        }



    }


}

new p5(sketch);