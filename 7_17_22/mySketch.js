let currentX, currentY;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');
	let col = color('black');
	col.setAlpha(200);
	stroke(col);
	strokeWeight(2);
	currentX = windowWidth/2;
	currentY = windowHeight/2;
	angleMode(DEGREES);
}

function draw() {
	// circle(windowWidth/2,windowHeight/2, 20);
	// point(100,100);
	// point(100,101);
	let rVec = randomVector();
	
	// bounds check
	if(currentX < 0 || currentX > windowWidth || 
		 currentY < 0 || currentY > windowHeight){
		clear();
		currentX = windowWidth/2;
		currentY = windowHeight/2;
	}
	
	
	// draw 90 angle to destination
	line(currentX, currentY, currentX, currentY+rVec.y);
	currentY += rVec.y;
	line(currentX, currentY, currentX+rVec.x, currentY);
	currentX += rVec.x;
	
	// noLoop();
	// frameRate(1);
}

function randomVector(){
	// weight angle towards destination point
	// by decreasing the angle range to be towards destination
	// the further we are
	
	let dest = createVector(windowWidth/2,windowHeight/2);
	let current = createVector(currentX, currentY);
	let maxDist = dest.dist(createVector(0,0));
	let distanceAway = current.dist(dest);
	
	let lowerBound = 0;
	let upperBound = 360;
	
	
	// I
	// if(currentX > windowWidth/2 && currentY < windowHeight/2){
	// 	// console.log("I");
	// 	// skew range towards III
	// 	let lowerBound = 90;
	// 	let upperBound = 180;
	// }
	// // II
	// else if(currentX < windowWidth/2 && currentY < windowHeight/2){
	// 	// console.log("II");
	// 	// skew range towards IV
	// 	let lowerBound = 0;
	// 	let upperBound = 90;
	// }
	// // III
	// else if(currentX < windowWidth/2 && currentY > windowHeight/2){
	// 	// console.log("III");
	// 	// skew range towards I
	// 	let lowerBound = 270;
	// 	let upperBound = 360;
	// }
	// // IV
	// else if(currentX > windowWidth/2 && currentY > windowHeight/2){
	// 	// console.log("IV");
	// 	// skew range towards II
	// 	let lowerBound = 180;
	// 	let upperBound = 270;
	// }
	
	return p5.Vector.fromAngle(
		random(lowerBound,upperBound), 
		25// 20-((distanceAway/maxDist)*10)
	);
}