let scaleFactor = 0;
let t = 0;
let simplex;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background("#2B303A");
	scaleFactor = 5;
	t = 0;

	simplex = new SimplexNoise();
	blendMode(DODGE);
}

function draw() {
	clear();
	translate(windowWidth/4, windowHeight/4);
	noFill();
	stroke("#FF8CC0");
	strokeWeight(scaleFactor);
	t += 0.01;
	
	for(let i=5; i<floor(windowWidth*0.5/scaleFactor)-5; i++){
		beginShape();
		for(let j=5; j<floor(windowHeight*0.5/scaleFactor)-5; j++){
			let x = i*scaleFactor;
			let y = j*scaleFactor;
			
			curveVertex(x+(simplex.noise3D(x*0.01,y*0.01,t)*scaleFactor*2), 
									y+(simplex.noise3D(x*0.01,y*0.01,t)*scaleFactor*2));
		}
		endShape();
	}
	
	// if(frameCount==1){
	// 	saveCanvas("7_16_22", "jpg");
	// }
}