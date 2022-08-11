let red;
let tan;
let leftPoints = [];
let rightPoints = [];
let amt;
function setup() {
	createCanvas(windowWidth, windowHeight);
	red = color('#A63A50');
	tan = color('#F0E7D8');
	
	
	amt = 10;
	for(let i=0; i<amt; i++){
		let p = {};
		p.x = random(0, width/4);
		p.y = random(height/3, 2*height/3);
		leftPoints.push(p);
	}
	
	for(let i=0; i<amt; i++){
		let p = {};
		p.x = random(3*width/4, width);
		p.y = random(0, height);
		p.sWeight = random(3,10);
		rightPoints.push(p);
	}
	
	background(red);
	fill(tan);
	stroke(red);
	circle(width/2, height/2, width/2);
}

function draw() {
	for(let i=0; i<amt; i++){
		let leftP = leftPoints[i];
		let rightP = rightPoints[i];
		strokeWeight(rightP.sWeight);
		line(leftP.x, leftP.y, rightP.x, rightP.y);
	}
	
	noLoop();
}