import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

let sketch = function (p) {

    let palette = tome.get("kaffeprat");
    let bgColor = tome.get("kaffeprat").colors[2];

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        //p.createCanvas(200, 200);

        p.noiseSeed(99);
        p.background(bgColor);
    }

    let wave1 = new PerlinWave(0, 700, palette.colors[1], palette.colors[1], 99, 0.003, 0.003);
    let wave2 = new PerlinWave(1000, 300, palette.colors[3], palette.colors[3], 90, 0.005, 0.0017);
    let wave3 = new PerlinWave(1000, 500, palette.colors[4], palette.colors[4], 99, 0.003, 0.003);
    //let wave4 = new PerlinWave(1000, 10, palette.colors[1], palette.colors[2], 70, 0.005, 0.003);
    console.log(wave1);
    p.draw = function () {
        p.background(bgColor);

        drawWave(wave1);

        drawWave(wave3);

        drawWave(wave2);
        
        //drawWave(wave4);

    }

    // draw one frame of a wave
    function drawWave(wave) {

        p.push();
        p.noiseSeed(wave.seed);

        // set colors
        p.fill(wave.fillColor);
        p.stroke(wave.strokeColor);
        p.strokeWeight(5);

        // make shape
        wave.time = wave.startX;
        p.beginShape();
        p.vertex(0, p.height);
        let y;
        let offset;
        for (let i = 0; i < p.width; i++) {
            offset = (wave.yLevel - wave.amp) < 0 ? 0 : (wave.yLevel - wave.amp);
            y =  offset + p.noise(wave.startX + wave.time) * wave.amp;
            p.vertex(i, y);
            
            wave.time += wave.increment;
        }
        p.vertex(p.width, p.height);
        p.endShape();
        wave.startX += wave.speed;

        p.pop();
    }
}

class PerlinWave {
    constructor(yLevel, amp, fillColor, strokeColor, seed, speed, increment) {
        this.yLevel = yLevel;
        this.amp = amp;
        this.fillColor = fillColor;
        this.strokeColor = strokeColor;
        this.speed = speed;
        this.seed = seed;
        this.increment = increment;
        this.startX = 0;
        this.time = 0;
    }
}



new p5(sketch);