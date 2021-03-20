import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

// x and y are center
class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}

let sketch = function (p) {

    let palette = tome.get("kov_06b");
    let bgColor = tome.get("retro").colors[2];

    //console.log(palette.colors);

    p.setup = function () {
        // set up canvas and brush
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.background(bgColor);
        p.fill(255);
        //p.noLoop();
        p.frameRate(1);
    }   

    p.mousePressed = function () {
        p.redraw();
    }

    let w = 0;
    let h = 0;
    let iterations = 10;
    let rects = [];
    p.draw = function () {

        // clear old rects
        rects = [];

        w = p.random(400, 1200);
        h = p.random(400, 800);
        // reset frame
        p.background(bgColor);

        p.translate(p.width / 2, p.height / 2);
        p.rectMode(p.CENTER);

        // initial rectangle
        p.push();
        p.fill(palette.colors[p.round(p.random(0, palette.colors.length - 1))]);
        p.strokeWeight(10);
        p.stroke(palette.colors[5]);
        p.rect(0, 0, w, h);
        p.pop();

        // add our rect to the array
        rects.push(new Rectangle(0, 0, w, h));

        console.log(rects);
        //split(rects[0], 0);

        for (let i = 1; i < iterations; i++) {
            //split(rects[p.round(p.random(0,rects.length-1))], p.round(p.random(0,1)));
            let randomRect = rects[p.round(p.random(0, rects.length - 1))];
            let randomSplit = p.round(p.random(0, 1))
            split(randomRect, randomSplit);
        }


    }

    // mode 0 - vert, mode 1 - hor
    // rect is our rectangle class
    function split(rect, mode) {
        let boundWidth = rect.width;
        let boundHeight = rect.height;
        let padding = 40;
        let border = 10;
        let borderColor = palette.colors[5];
        let fillColor = palette.colors[p.round(p.random(0, palette.colors.length - 1))];

        p.push();
        p.fill(fillColor);
        p.strokeWeight(border);
        p.stroke(borderColor);
        if (mode) { // 1 - hor
            let topCenter = p.createVector(rect.x, rect.y + boundHeight / 4);
            let bottCenter = p.createVector(rect.x, rect.y - boundHeight / 4);
            let width = boundWidth - padding;
            let height = boundHeight / 2 - padding;

            // remove the rect from pool if the split rects will be too small
            if ((width < 0) || (height < 0)) {
                rects.splice(rects.indexOf(rect), 1);
                return;
            }

            // top rectangle
            p.rect(topCenter.x, topCenter.y, width, height);

            // bott rectangle
            p.rect(bottCenter.x, bottCenter.y, width, height);

            p.pop();

            // add new rectangles
            rects.push(new Rectangle(topCenter.x, topCenter.y, width, height));
            rects.push(new Rectangle(bottCenter.x, bottCenter.y, width, height));

            // remove the rectangle that we just split
            rects.splice(rects.indexOf(rect), 1);

        }
        else { // 0 - vert
            let leftCenter = p.createVector(rect.x - boundWidth / 4, rect.y);
            let rightCenter = p.createVector(rect.x + boundWidth / 4, rect.y);
            let width = boundWidth / 2 - padding;
            let height = boundHeight - padding;

            // remove the rect from pool if the split rects will be too small
            if ((width < 0) || (height < 0)) {
                rects.splice(rects.indexOf(rect), 1);
                return;
            }

            // left rectangle
            p.rect(leftCenter.x, leftCenter.y, width, height);

            // right rectangle
            p.rect(rightCenter.x, rightCenter.y, width, height);

            p.pop();

            // add new rectangles
            rects.push(new Rectangle(leftCenter.x, leftCenter.y, width, height));
            rects.push(new Rectangle(rightCenter.x, rightCenter.y, width, height));

            // remove the rectangle that we just split
            rects.splice(rects.indexOf(rect), 1);
        }

        // split a rectangle vertically into two more
        function splitVert(centX, centY, boundWidth, boundHeight) {
            let padding = 40;
            let border = 10;
            let borderColor = palette.colors[5];
            let fillColor = palette.colors[p.round(p.random(0, palette.colors.length - 1))];
            p.push();

            // top rect
            p.fill(fillColor);
            p.strokeWeight(border);
            p.stroke(borderColor);
            p.rect(centX, centY + boundHeight / 4, boundWidth - padding, boundHeight / 2 - padding);

            // bott rect
            p.fill(fillColor);
            p.strokeWeight(border);
            p.stroke(borderColor);
            p.rect(centX, centY - boundHeight / 4, boundWidth - padding, boundHeight / 2 - padding);

            p.pop();
        }

        // split a rectangle horizontally into two more
        function splitHor(centX, centY, boundWidth, boundHeight) {
            let padding = 40;
            let border = 10;
            let borderColor = palette.colors[5];
            let fillColor = palette.colors[p.round(p.random(0, palette.colors.length - 1))];
            p.push();

            // top rect
            p.fill(fillColor);
            p.strokeWeight(border);
            p.stroke(borderColor);
            p.rect(centX + boundWidth / 4, centY, boundWidth / 2 - padding, boundHeight - padding);

            // bott rect
            p.fill(fillColor);
            p.strokeWeight(border);
            p.stroke(borderColor);
            p.rect(centX - boundWidth / 4, centY, boundWidth / 2 - padding, boundHeight - padding);

            p.pop();
        }


    }
}

new p5(sketch);