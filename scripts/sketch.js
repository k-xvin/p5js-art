import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("kov_06b");
    let bgColor = tome.get("retro").colors[2];

    //console.log(palette.colors);

    p.setup = function () {
        // set up canvas and brush
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.background(bgColor);
        p.fill(255);
        p.noLoop();

    }

    let w = 600;
    let h = 400;
    p.draw = function () {
        // reset frame
        p.background(bgColor);

        p.translate(p.width/2, p.height/2);
        p.rectMode(p.CENTER);

        p.push();
        p.fill(palette.colors[p.round(p.random(0,palette.colors.length-1))]);
        p.strokeWeight(10);
        p.stroke(palette.colors[5]);
        p.rect(0, 0, w, h); 
        p.pop();

        splitVert(0 - w/4, 0, w/2, h);
        splitHor(0 + w/4, 0, w/2, h);

    }

    // split a rectangle vertically into two more
    function splitVert(centX, centY, boundWidth, boundHeight){
        let padding = 40;
        let border = 10;
        let borderColor = palette.colors[5];
        let fillColor = palette.colors[p.round(p.random(0,palette.colors.length-1))];
        p.push();
        
        // top rect
        p.fill(fillColor);
        p.strokeWeight(border);
        p.stroke(borderColor);
        p.rect(centX, centY + boundHeight/4, boundWidth - padding, boundHeight/2 - padding);
        
        // bott rect
        p.fill(fillColor);
        p.strokeWeight(border);
        p.stroke(borderColor);
        p.rect(centX, centY - boundHeight/4, boundWidth - padding, boundHeight/2 - padding); 

        p.pop();
    }

    // split a rectangle horizontally into two more
    function splitHor(centX, centY, boundWidth, boundHeight){
        let padding = 40;
        let border = 10;
        let borderColor = palette.colors[5];
        let fillColor = palette.colors[p.round(p.random(0,palette.colors.length-1))];
        p.push();
        
        // top rect
        p.fill(fillColor);
        p.strokeWeight(border);
        p.stroke(borderColor);
        p.rect(centX + boundWidth/4, centY, boundWidth/2 - padding, boundHeight - padding);
        
        // bott rect
        p.fill(fillColor);
        p.strokeWeight(border);
        p.stroke(borderColor);
        p.rect(centX - boundWidth/4, centY, boundWidth/2 - padding, boundHeight - padding);

        p.pop();
    }


}

new p5(sketch);