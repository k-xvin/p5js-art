// https://coolors.co/f8c7cc-81a684-57886c-466060-0e0f19
let palette = ["#f8c7cc","#81a684","#57886c","#466060","#0e0f19"];
let t;
let radius = 20;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background(palette[0]);
	t=0;
	rectMode(RADIUS);
	blendMode(BURN);
}

function draw() {
	noFill();
	stroke(palette[1]);
	strokeWeight(1);
	
	translate(windowWidth/2, windowHeight/2);
	
	let x = radius*cos(t)*sin(t)*sin(t);
	let y = radius*sin(t);
	rect(x, y, radius, radius);
	t += TAU/200;
	
	if(t > TAU){
		t=0;
		radius += 20;
	}
	
	if(radius > windowWidth/4){
		noLoop();
	}
	
}