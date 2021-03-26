import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("dt05");
    let bgColor = palette.background;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.background(bgColor);
    }

    let pause = 1;
    p.mouseClicked = function () {
        if(pause){
            p.noLoop();
            pause = 0;
        }
        else {
            p.loop();
            pause = 1;
        }
        
    }


    let xoff = 0;
    let yoff = 0;
    p.draw = function () {
        //p.background(bgColor);

        let x = p.noise(xoff/*,yoff*/)*p.width;
        let y = p.noise(xoff+5/*,yoff+5*/)*p.height;
        drawShadedRect(x,y, 40, 80);

        xoff += 0.009;
        //yoff += 0.008;
    }

    let strokeColor = p.color(palette.colors[0]);
    strokeColor.setAlpha(90);
    function drawShadedRect(x1, y1, x2, y2){
        p.stroke(strokeColor);
        p.strokeWeight(4);
        p.fill(bgColor);

        p.rect(x1,y1,x2,y2);
        //p.rect(x1,y1,x2-7,y2);
        
    }

}

new p5(sketch);