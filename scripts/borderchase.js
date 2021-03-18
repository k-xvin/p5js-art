
function setup() {
    // set up canvas and brush
    createCanvas(windowWidth, windowHeight);
    background("#0d1117");
    fill(255);
    noStroke();
}

let x = 40, y = 40;
let speed = 20;
function draw() {
    // reset frame
    background("#0d1117");

    circle(x, y, 40);
    if (x <= 40 && !(y <= 40)){
        x = 40;
        y -= speed;
    }
    else if( y >= height - 40){
        y = height - 40
        x -= speed;
    }
    else if(x >= width - 40){
        x = width - 40
        y += speed;
    }
    else if (y <= 40){
        y = 40;
        x += speed;
    }


}

function getCircX() {

}

function getCircY() {

}
