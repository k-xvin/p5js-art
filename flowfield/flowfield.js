import * as tome from '../../node_modules/chromotome/dist/index.esm.js';

// referenced from https://editor.p5js.org/codingtrain/sketches/vDcIAbfg7
// and https://github.com/kgolid/p5ycho/blob/master/topology/sketch.js
// and https://generated.space/sketch/perlin-topology/
let sketch = function (p) {

    let palette = tome.get("dt09");
    let bgColor = palette.background;

    let cols, rows;
    let scale = 20;

    let flowfield = [];
    let xoff, yoff, zoff;

    let numParticles = 100;
    let particles = [];
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);

        p.background(bgColor);
        p.noiseSeed(99);

        cols = p.floor(p.width / scale);
        rows = p.floor(p.height / scale);

        xoff = 0;
        yoff = 0;
        zoff = 0;

        createParticles();
        calcFlowfield();
        //p.noLoop();
    }


    p.draw = function () {
        //p.background(bgColor);
        updateParticles();
        //drawFlowfield();
        displayParticles();
    }

    function createParticles() {
        for (let i = 0; i < numParticles; i++) {
            //let randX = p.random(0 , p.width);
            //let randY = p.random(0 , p.height);
            let randX = p.random(200, 600);
            let randY = p.random(200, 600);
            particles.push({
                pos: p.createVector(randX, randY),
                prev: p.createVector(randX, randY),
                vel: p.createVector(0, 0),
                acc: p.createVector(0, 0),
            });
        }
    }

    function displayParticles() {
        p.strokeWeight(4);
        //p.stroke(palette.colors[0]);
        p.stroke(p.color(5, 46, 87, 20));
        for (let i = 0; i < numParticles; i++) {
            // line from previous position to current position
            p.line(particles[i].prev.x, particles[i].prev.y, particles[i].pos.x, particles[i].pos.y);
        }
    }

    function updateParticles() {
        // get a new flowfield
        calcFlowfield();

        for (let i = 0; i < numParticles; i++) {
            let particle = particles[i];

            // if particle is out of screen, loop to other side and reset
            if (particle.pos.x < 0) {
                particle.pos.x = p.width;
                particle.prev.x = p.width;
                //particle.vel.mult(0);
                //particle.acc.mult(0);
            }
            if (particle.pos.x > p.width) {
                particle.pos.x = 0;
                particle.prev.x = 0;
                //particle.vel.mult(0);
                //particle.acc.mult(0);
            }
            if (particle.pos.y < 0) {
                particle.pos.y = p.height;
                particle.prev.y = p.height;
                //particle.vel.mult(0);
                //particle.acc.mult(0);
            }
            if (particle.pos.y > p.height) {
                particle.pos.y = 0;
                particle.prev.y = 0;
                //particle.vel.mult(0);
                //particle.acc.mult(0);
            }

            let flowVector = getFlowVector(particle.pos.x, particle.pos.y);

            // save current pos to prev
            particle.prev.x = particle.pos.x;
            particle.prev.y = particle.pos.y;

            // update current pos from velocity
            particle.pos.add(particle.vel);

            // update velocity from acceleration
            particle.vel.add(particle.acc);
            // limit max velocity
            particle.vel.limit(4);

            // update acceleration from flowfield
            //console.log(flowVector.x);
            particle.acc.add(flowVector);
        }
    }

    // returns the vector at position x y
    function getFlowVector(x, y) {
        //console.log(x,y);
        let currCol = p.floor(x / scale);
        let currRow = p.floor(y / scale);
        let index = currCol * cols + currRow;

        return flowfield[index];
    }

    function drawFlowfield() {
        for (let x = 0; x < cols; x++) {
            for (let y = 0; y < rows; y++) {
                p.push();
                p.stroke(0);
                let v = flowfield[x * cols + y];
                p.translate(x * scale, y * scale);
                p.rotate(v.heading());
                p.strokeWeight(1);
                p.line(0, 0, scale, 0);
                p.pop();
            }
        }
    }

    function calcFlowfield() {
        xoff = 0;
        for (let x = 0; x < cols; x++) {
            yoff = 0;
            for (let y = 0; y < rows; y++) {
                let angle = p.noise(xoff, yoff, zoff) * p.TWO_PI * 2;
                let v = p5.Vector.fromAngle(angle);

                //1d representation of 2d array
                let index = x * cols + y;

                // pop the field into our array
                flowfield[index] = v;

                yoff += 0.01;
            }
            xoff += 0.01;
        }
        zoff += 0.001;
    }


}

new p5(sketch);