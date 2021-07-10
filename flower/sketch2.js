
let sketch = function (p) {

    // https://coolors.co/dccca3-824c71-4a2545-000001-90aa86
    let palette = ["#DCCCA3", "#824C71", "#4A2545", "#000001", "#90AA86"];

    let radiusSlider;
    let verticesSlider;
    let periodSlider;
    let minPetalRadiusSlider;
    let maxPetalRadiusSlider;
    let numPetalCirclesSlider;

    // default values
    let default_radius = 200;
    let default_vertices = 5;
    let default_period = 4;
    let default_minPetalRadius = 10;
    let default_maxPetalRadius = 30;
    let default_numPetalCircles = 5;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textSize(24);


        let sliderX = 10;
        let sliderY = 10;

        let labelX = 170;
        let labelY = 10;

        radiusSlider = createSliderWithLabel(0, 500, default_radius, 1, "Radius");
        verticesSlider = createSliderWithLabel(0, 25, default_vertices, 1, "Vertices");
        periodSlider = createSliderWithLabel(0, 5, default_period, 1, "Period");
        minPetalRadiusSlider = createSliderWithLabel(0, 100, default_minPetalRadius, 1, "Min Petal Radius");
        maxPetalRadiusSlider = createSliderWithLabel(0, 100, default_maxPetalRadius, 1, "Max Petal Radius");
        numPetalCirclesSlider = createSliderWithLabel(0, 20, default_numPetalCircles, 1, "Petal Circles");

        // creates a slider and increments for next slider
        function createSliderWithLabel(min, max, starting, step, label) {
            let slider = p.createSlider(min, max, starting, step)
                .position(sliderX, sliderY)
                .style('width', '150px');

            p.createDiv(label).style('background-color', '#EBEBEB').position(labelX, labelY);
            sliderY += 20;
            labelY += 20;

            return slider;
        }

    }

    p.draw = function () {
        let radius = radiusSlider.value();
        let vertices = verticesSlider.value();
        let period = periodSlider.value();
        let minPetalRadius = minPetalRadiusSlider.value();
        let maxPetalRadius = maxPetalRadiusSlider.value();
        let numPetalCircles = numPetalCirclesSlider.value();

        p.background(palette[0]);

        //p.rectMode(p.CENTER);
        p.translate(p.windowWidth / 2, p.windowHeight / 2);
        //p.text("happy birthday", -100, -100);

        p.rotate(p.millis() / 5000);
        let layers = 8;
        for (let i = 0; i < vertices * layers; i++) {
            // 4 rotations until back to starting
            let interAngle = (360 / vertices);
            let point = p5.Vector.fromAngle(p.radians((i * interAngle) + (p.floor(i / vertices) % period) * interAngle / period));
            let layer = layers - (p.floor(i / vertices));
            point.setMag(radius * layer);
            drawCirclePetal(p.createVector(0, 0), point, minPetalRadius * layer, maxPetalRadius * layer, numPetalCircles, palette[layer % 5], palette[2]);
        }
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
        p.stroke(accColor);

        // transitionary circles
        let distance = p.dist(start.x, start.y, end.x, end.y);
        let angleFromZero = p.createVector(50, 0).angleBetween(end);
        let sectionLength = distance / (numCircles + 1);
        let radiusSlope = p.abs(maxRadius - minRadius) / (numCircles / 2);
        let currentRadius = minRadius;
        for (let i = 1; i <= numCircles; i++) {
            let offset = sectionLength * i;
            let currentPoint = { x: start.x + offset * p.cos(angleFromZero), y: start.y + offset * p.sin(angleFromZero) };

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

        p.pop();
    }

}


new p5(sketch);