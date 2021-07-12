
let sketch = function (p) {

    // https://coolors.co/dccca3-824c71-4a2545-000001-90aa86
    let palette = ["#DCCCA3", "#824C71", "#4A2545", "#000001", "#90AA86"];
    let paletteHSB = [];

    let radiusSlider;
    let verticesSlider;
    let periodSlider;
    let widthSlider;
    let layersSlider;

    let lineCheckbox;
    let rotateCheckbox;

    // default values
    let default_radius = 80;
    let default_vertices = 5;
    let default_period = 5;
    let default_width = default_radius; //default_radius/2;
    let default_layers = 5;
    let default_linesCheck = false;
    let default_rotateCheck = false;

    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);

        let sliderX = 10;
        let sliderY = 10;

        let labelX = 170;
        let labelY = 10;

        radiusSlider = createSliderWithLabel(0, 250, default_radius, 1, "Radius");
        verticesSlider = createSliderWithLabel(0, 15, default_vertices, 1, "Vertices");
        periodSlider = createSliderWithLabel(0, 10, default_period, 0.5, "Period");
        widthSlider = createSliderWithLabel(0, 250, default_width, 1, "Width");
        layersSlider = createSliderWithLabel(0, 25, default_layers, 1, "Layers");

        lineCheckbox = p.createCheckbox("Petal Lines", default_linesCheck).position(sliderX, sliderY);
        rotateCheckbox = p.createCheckbox("Rotate", default_rotateCheck).position(sliderX + 100, sliderY);

        // creates a slider and increments for next slider
        function createSliderWithLabel(min, max, starting, step, label) {
            let slider = p.createSlider(min, max, starting, step)
                .position(sliderX, sliderY)
                .style('width', '150px');

            p.createDiv(label)/*.style('background-color', '#EBEBEB')*/.position(labelX, labelY);
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
        let layers = layersSlider.value();


        p.background(palette[0]);

        //p.rectMode(p.CENTER);
        p.translate(p.windowWidth / 2, p.windowHeight / 2);

        p.textSize(24);
        p.text("happy birthday hannah", -150, -20);

        if (rotateCheckbox.checked()) {
            p.rotate(p.millis() / 5000);
        }
        //let layers = 6;
        for (let i = 0; i < vertices * layers; i++) {
            // 4 rotations until back to starting
            let interAngle = (360 / vertices);
            let end = p5.Vector.fromAngle(p.radians((i * interAngle) + (p.floor(i / vertices) % period) * interAngle / period));
            let layer = layers - (p.floor(i / vertices));
            end.setMag(radius * layer);

            p.colorMode(p.HSB, 100);
            let petalColor = p.color(palette[1]);
            let outlineColor = p.color(palette[0]);

            let brightnessOffset = (p.brightness(petalColor) / (layers * 2)) + 1;
            //petalColor = p.color(p.hue(petalColor), p.saturation(petalColor), p.brightness(petalColor) - layer*7);
            petalColor = p.color(p.hue(petalColor), p.saturation(petalColor), p.brightness(petalColor) - brightnessOffset * layer);
            outlineColor = p.color(p.hue(outlineColor), p.saturation(outlineColor), p.brightness(outlineColor));

            if (layer != 1 && lineCheckbox.checked()) {
                drawPetal(p.createVector(0, 0), end, width * layer, petalColor, outlineColor, 3, true);
            }
            else {
                drawPetal(p.createVector(0, 0), end, width * layer, petalColor, outlineColor, 3, false);
            }



            // add a final half petal to normalize petal overlaps
            // but that shit is too hard bro
        }

    }

    function drawPetal(start, end, width, fillColor, borderColor, borderWidth, hasLine) {
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
        if (hasLine) {
            p.stroke(borderColor);
            p.strokeWeight(2);
            p.line(start.x, start.y, end.x, end.y);
        }


        // debug bezier points
        // p.circle(start.x, start.y, 10);
        // p.circle(control1.x, control1.y, 10);
        // p.circle(control2.x, control2.y, 10);
        // p.circle(end.x, end.y, 10);

        p.pop();
    }

    // Draws a petal shaped such that it will not overlap the first petal
    // function drawLastPetal(start, end, width, fillColor, borderColor, borderWidth, compensationAngle) {
    //     p.push();
    //     p.stroke(borderColor);
    //     p.strokeWeight(borderWidth);
    //     p.fill(fillColor);
    //     p.noFill();

    //     let angleFromZero = p.createVector(50, 0).angleBetween(end);
    //     let length = p.abs(start.mag() - end.mag());

    //     let thirdLength = length / 3;
    //     let widthAngle = p.atan(width / thirdLength);
    //     let widthHypotenuse = p.sqrt(thirdLength * thirdLength + width * width);

    //     // Note: in p5, angle goes negative as it goes counterclockwise
    //     // this point will be width distance away from the mid of the central axis
    //     // perpendicular to the central axis
    //     // in summary, controls the "width"
    //     let control1 = p5.Vector.fromAngle(angleFromZero - widthAngle).setMag(widthHypotenuse);

    //     // this point will be along the central axis
    //     // and 75% of the full length
    //     // in summary, controls the "notch" on the end
    //     let control2 = p5.Vector.fromAngle(angleFromZero).setMag(length * 0.75);

    //     // half a petal
    //     p.bezier(start.x, start.y, control1.x, control1.y, control2.x, control2.y, end.x, end.y);

    //     // lines to represent overlap
    //     for (let i = 0; i < 8; i++) {
    //         p.rotate(compensationAngle);
    //         p.bezier(start.x, start.y, control1.x, control1.y, control2.x, control2.y, end.x, end.y);
    //     }

    //     p.circle(end.x, end.y, 10);
    //     p.pop();
    // }
}


new p5(sketch);