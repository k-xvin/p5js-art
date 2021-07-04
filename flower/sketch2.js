
let sketch = function (p) {

    // https://coolors.co/dccca3-824c71-4a2545-000001-90aa86
    let palette = ["#DCCCA3", "#824C71", "#4A2545", "#000001", "#90AA86"];

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.background(palette[0]);
    }


    let radius = 200;
    p.draw = function () {
        p.background(palette[0]);

        p.rectMode(p.CENTER);
        p.translate(p.windowWidth / 2, p.windowHeight / 2);
        //p.circle(0, 0, 10, 10);

        //p.rotate(p.millis() / 5000);
        let layers = 4;
        for (let i = 0; i < 5*layers; i++) {
            // 4 rotations until back to starting
            let point = p5.Vector.fromAngle(p.radians((i * 72) + (p.floor(i / 5) % 4) * 18));
            let layer = layers - (p.floor(i / 5));
            point.setMag(radius * layer);
            //drawPetal(p.createVector(0, 0), point, 100, palette[1]);
            drawCirclePetal(p.createVector(0, 0), point, 10*layer, 30*layer, 5, palette[layer]);
        }
    }

    // draw a petal from point 1 to point 2
    function drawPetal(p1, p2, curveRadius, color) {
        p.push();
        p.stroke(color);
        p.strokeWeight(4);
        p.noFill();
        //p.fill(palette[2]);
        //let center = { x: (p1.x + p3.y) / 2, y: (p1.y + p3.y) / 2}

        let perpAngle = p.createVector(50, 0).angleBetween(p2) + p.HALF_PI;
        let curvePoint = p5.Vector.fromAngle(perpAngle);
        curvePoint.setMag(curveRadius);
        curvePoint.x += ((p1.x + p2.x) / 2);
        curvePoint.y += ((p1.y + p2.y) / 2);

        p.circle(curvePoint.x, curvePoint.y, 5);

        p.curve(curvePoint.x, curvePoint.y, p1.x, p1.y, p2.x, p2.y, curvePoint.x, curvePoint.y);


        perpAngle = p.createVector(50, 0).angleBetween(p2) - p.HALF_PI;
        curvePoint = p5.Vector.fromAngle(perpAngle);
        curvePoint.setMag(curveRadius);
        curvePoint.x += ((p1.x + p2.x) / 2);
        curvePoint.y += ((p1.y + p2.y) / 2);

        //p.curve(curvePoint.x, curvePoint.y, p1.x, p1.y, p2.x, p2.y, curvePoint.x, curvePoint.y);


        // p.fill("black");
        // p.noStroke();
        // p.circle(p3.x, p3.y, 5);

        p.pop();
    }


    // Draw a petal shape filled with circles
    // start - starting point
    // end - ending point
    // minRadius - size of smallest circle
    // maxRadius - size of biggest circle
    // numDivisions - number of circles
    function drawCirclePetal(start, end, minRadius, maxRadius, numCircles, color, accColor) {
        p.push();
        p.noStroke();

        // start circle
        //p.fill(color);
        //p.circle(start.x, start.y, minRadius * 2);

        // transitionary circles
        let distance = p.dist(start.x, start.y, end.x, end.y);
        let angleFromZero = p.createVector(50, 0).angleBetween(end);
        let sectionLength = distance / (numCircles + 1);
        let radiusSlope = p.abs(maxRadius - minRadius) / (numCircles / 2);
        let currentRadius = minRadius;
        for (let i = 1; i <= numCircles; i++) {
            let offset = sectionLength * i;
            let currentPoint = { x: start.x + offset * p.cos(angleFromZero), y: start.y + offset * p.sin(angleFromZero) };
            //currentRadius += radiusSlope;

            // before midpoint
            // midpoint
            // if (i == p.ceil(numCircles / 2)) {
            //     //p.fill(color);
            //     //p.circle(currentPoint.x, currentPoint.y, maxRadius * 2);
            // }
            // before midpoint
            if (i <= p.ceil(numCircles / 2)) {
                currentRadius += radiusSlope;
            }
            // after midpoint
            else {
                if (i == p.ceil(numCircles / 2)) currentRadius = maxRadius;
                currentRadius -= radiusSlope;
            }


            p.fill(color);
            p.circle(currentPoint.x, currentPoint.y, currentRadius * 2);
        }

        // end circle
        //p.fill(color);
        //p.circle(end.x, end.y, minRadius * 2);

        p.pop();
    }

}


new p5(sketch);