OPC.slider("period", 15, 1, 150, 0.01);
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');
	stroke('black');
	strokeWeight(2);
	noFill();
	
	t = 0;
	amp = 500;
	splitFactor = 10;
	scaleFactor = 20;
	wavelength = width;
	// period = 100;
}

let t = 0;
let splitFactor = 0;
let amp = 0;
let scaleFactor = 0;
let wavelength = 0;
// let period = 0;
function draw() {
	background('white');
	t += 0.1;
	
	for(let j=3; j<40; j++){
		beginShape();
		for(let i=0;i<ceil(width/scaleFactor)+1;i++){
			let x = i * scaleFactor;
			vertex(x+j*10,
						 height/2 + 
						 j*10*sin((TAU/wavelength)*(x+(wavelength/period)*t))
						);
		}
		endShape();
	}
	
}