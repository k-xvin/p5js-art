
let sketch = function (p) {

    // https://coolors.co/dccca3-824c71-4a2545-000001-90aa86
    let palette = ["#DCCCA3", "#824C71", "#4A2545", "#000001", "#90AA86"];

    let radiusSlider;
    let verticesSlider;
    let periodSlider;
    let widthSlider;

    // default values
    let default_radius = 200;
    let default_vertices = 5;
    let default_period = 4;
    let default_width = 100;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        p.textSize(24);


        let sliderX = 10;
        let sliderY = 10;

        let labelX = 170;
        let labelY = 10;

        radiusSlider = createSliderWithLabel(0, 500, default_radius, 1, "Radius");
        verticesSlider = createSliderWithLabel(0, 15, default_vertices, 1, "Vertices");
        periodSlider = createSliderWithLabel(0, 10, default_period, 0.5, "Period");
        widthSlider = createSliderWithLabel(0, 500, default_width, 1, "Width");

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
        let width = widthSlider.value();

        p.background(palette[0]);

        //p.rectMode(p.CENTER);
        p.translate(p.windowWidth / 2, p.windowHeight / 2);
        //p.text("happy birthday", -100, -100);

        //p.rotate(p.millis() / 5000);
        let layers = 1;
        for (let i = 0; i < vertices * layers; i++) {
            // 4 rotations until back to starting
            let interAngle = (360 / vertices);
            let end = p5.Vector.fromAngle(p.radians((i * interAngle) + (p.floor(i / vertices) % period) * interAngle / period));
            let layer = layers - (p.floor(i / vertices));
            end.setMag(radius * layer);

            drawPetal(p.createVector(0, 0), end, width * layer, palette[1], palette[2], 3 + layer);


            // add a final half petal to normalize petal overlaps
            if (i == (vertices * layers) - 1) {
                //drawLastPetal(p.createVector(0, 0), end, width * layer, palette[1], palette[2], 3 + layer, p.radians(interAngle));
            }

            // add a final half petal to normalize petal overlaps
            // if (i == (vertices * layers) - 1) {
            //     end = p5.Vector.fromAngle(0);
            //     end.setMag(radius * layer);
            //     drawLastPetal(p.createVector(0, 0), end, width * layer, palette[1], palette[2], 3 + layer, p.radians(interAngle));
            // }
        }

    }

    function drawPetal(start, end, width, fillColor, borderColor, borderWidth) {
        p.push();
        p.stroke(borderColor);
        p.strokeWeight(borderWidth);
        p.fill(fillColor);

        let angleFromZero = p.createVector(50, 0).angleBetween(end);
        let length = p.abs(start.mag() - end.mag());

        let thirdLength = length / 3;
        let widthAngle = p.atan(width / thirdLength);
        let widthHypotenuse = p.sqrt(thirdLength * thirdLength + width * width);

        // Note: in p5, angle goes negative as it goes counterclockwise
        // this point will be width distance away from the mid of the central axis
        // perpendicular to the central axis
        // in summary, controls the "width"
        let control1 = p5.Vector.fromAngle(angleFromZero - widthAngle).setMag(widthHypotenuse);

        // this point will be along the central axis
        // and 75% of the full length
        // in summary, controls the "notch" on the end
        let control2 = p5.Vector.fromAngle(angleFromZero).setMag(length * 0.75);

        p.beginShape();
        p.vertex(start.x, start.y);
        p.bezierVertex(control1.x, control1.y, control2.x, control2.y, end.x, end.y);

        control1 = p5.Vector.fromAngle(angleFromZero + widthAngle).setMag(widthHypotenuse);
        p.bezierVertex(control2.x, control2.y, control1.x, control1.y, start.x, start.y);

        p.endShape();

        // // draws the top half of petal
        // p.bezier(start.x, start.y, control1.x, control1.y, control2.x, control2.y, end.x, end.y);

        // // mirror the bezier by flipping the widthAngle
        // control1 = p5.Vector.fromAngle(angleFromZero + widthAngle).setMag(widthHypotenuse);
        // p.bezier(start.x, start.y, control1.x, control1.y, control2.x, control2.y, end.x, end.y);

        // draw a line in the middle
        // p.stroke(centerLineColor);
        // p.line(start.x, start.y, end.x, end.y);


        // debug bezier points
        // p.circle(start.x, start.y, 10);
        // p.circle(control1.x, control1.y, 10);
        // p.circle(control2.x, control2.y, 10);
        // p.circle(end.x, end.y, 10);

        p.pop();
    }

    // Draws a petal shaped such that it will not overlap the first petal
    function drawLastPetal(start, end, width, fillColor, borderColor, borderWidth, compensationAngle) {
        p.push();
        p.stroke(borderColor);
        p.strokeWeight(borderWidth);
        p.fill(fillColor);
        p.noFill();

        let angleFromZero = p.createVector(50, 0).angleBetween(end);
        let length = p.abs(start.mag() - end.mag());

        let thirdLength = length / 3;
        let widthAngle = p.atan(width / thirdLength);
        let widthHypotenuse = p.sqrt(thirdLength * thirdLength + width * width);

        // Note: in p5, angle goes negative as it goes counterclockwise
        // this point will be width distance away from the mid of the central axis
        // perpendicular to the central axis
        // in summary, controls the "width"
        let control1 = p5.Vector.fromAngle(angleFromZero - widthAngle).setMag(widthHypotenuse);

        // this point will be along the central axis
        // and 75% of the full length
        // in summary, controls the "notch" on the end
        let control2 = p5.Vector.fromAngle(angleFromZero).setMag(length * 0.75);

        // half a petal
        p.bezier(start.x, start.y, control1.x, control1.y, control2.x, control2.y, end.x, end.y);

        // lines to represent overlap
        for (let i = 0; i < 8; i++) {
            p.rotate(compensationAngle);
            p.bezier(start.x, start.y, control1.x, control1.y, control2.x, control2.y, end.x, end.y);
        }

        p.circle(end.x, end.y, 10);
        p.pop();
    }
}


new p5(sketch);