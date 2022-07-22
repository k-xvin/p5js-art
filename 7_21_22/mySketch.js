let scaleFactor = 20;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('black');
	stroke('white');
	strokeWeight(2);
	// noFill();
	// blendMode(DODGE);
}

function draw() {
	// circle(mouseX, mouseY, 20);
	background('black');
	
	stroke('DARKRED');
	fill('RED');
	beginShape(TRIANGLES);
	for(let i=0; i<windowWidth/scaleFactor; i++){
		let x = i*scaleFactor;
		vertex(x,windowHeight/5 + sin(i*2+millis()/300)*windowHeight/7);
	}
	endShape();
	
	stroke('DARKGREEN');
	fill('GREEN');
	beginShape(TRIANGLES);
	for(let i=0; i<windowWidth/scaleFactor; i++){
		let x = i*scaleFactor;
		vertex(x,2.5*windowHeight/5 + sin(i*2+millis()/300)*windowHeight/7);
	}
	endShape();

	stroke('DARKBLUE');
	fill('BLUE');
	beginShape(TRIANGLES);
	for(let i=0; i<windowWidth/scaleFactor; i++){
		let x = i*scaleFactor;
		vertex(x,4*windowHeight/5 + sin(i*2+millis()/300)*windowHeight/7);
	}
	endShape();
}