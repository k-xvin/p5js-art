import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("dt09");
    let bgColor = palette.background;



    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(bgColor);
    }


    let radius = 100;
    p.draw = function () {
        p.background(bgColor);

        p.rectMode(p.CENTER);
        p.translate(p.windowWidth / 2, p.windowHeight / 2);
        p.circle(0, 0, 10, 10);

        p.rotate(p.millis() / 5000);
        for (let i = 0; i < 15; i++) {
            let point = p5.Vector.fromAngle(p.radians((i * 72) + (p.floor(i / 5) % 2) * 36));
            point.setMag(radius * (p.floor(i / 5) + 1));
            drawPetal(p.createVector(0, 0), p.createVector(0, 0), point);
        }
        
    }

    function drawPetal(p1, p2, p3) {
        p.push();
        p.stroke("red");
        p.strokeWeight(4);
        p.noFill();
        //let center = { x: (p1.x + p3.y) / 2, y: (p1.y + p3.y) / 2}

        let perpAngle = p.createVector(50, 0).angleBetween(p3) + p.HALF_PI;
        let curvePoint = p5.Vector.fromAngle(perpAngle);
        curvePoint.setMag(600);
        curvePoint.x += ((p1.x + p3.x) / 2);
        curvePoint.y += ((p1.y + p3.y) / 2);

        //p.circle(curvePoint.x, curvePoint.y, 5);

        p.curve(curvePoint.x, curvePoint.y, p1.x, p1.y, p3.x, p3.y, curvePoint.x, curvePoint.y);


        perpAngle = p.createVector(50, 0).angleBetween(p3) - p.HALF_PI;
        curvePoint = p5.Vector.fromAngle(perpAngle);
        curvePoint.setMag(600);
        curvePoint.x += ((p1.x + p3.x) / 2);
        curvePoint.y += ((p1.y + p3.y) / 2);

        p.curve(curvePoint.x, curvePoint.y, p1.x, p1.y, p3.x, p3.y, curvePoint.x, curvePoint.y);


        // p.fill("black");
        // p.noStroke();
        // p.circle(p3.x, p3.y, 5);
        
        p.pop();
    }

}


new p5(sketch);