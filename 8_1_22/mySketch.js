let points = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	// let gradient = drawingContext.createLinearGradient(0,0,0,height);
	// gradient.addColorStop(0, color('#F0E7D8'));
	// gradient.addColorStop(1, color('#A63A50'));
	// drawingContext.fillStyle = gradient;
	// rect(0,0,width,height);
	
	background('#A63A50');
	
	noStroke();
	
	for(let i=1; i<200; i++){
		let p = {};
		p.x = width/2;
		p.y = height/2;
		
		p.directionVector = p5.Vector.random2D();
		
		p.prevX = p.x;
		p.prevY = p.y;		
		
		points.push(p);
		
	}
	
	stroke('#F0E7D8');
}

let t = 0;
let done = false;
function draw() {
	t += 0.15
	
	let sWeight = 50-t;
	let cutoff = 5;
	if(sWeight > cutoff){
		strokeWeight(sWeight);
	}
	else {
		// done = true;
		strokeWeight(cutoff);
	}
	
	points.forEach((p) => {
		p.x += p.directionVector.x + random(-0.5, 0.5);
		p.y += p.directionVector.y + random(-0.5, 0.5);

		line(p.x,p.y,p.prevX,p.prevY);
		
		p.prevX = p.x;
		p.prevY = p.y;
		
	});
	
	// if(done){
	// 	noFill();
	// 	strokeWeight(30);
	// 	stroke('#A63A50');
	// 	circle(width/2, height/2, (50/0.15)*2);
	// }
}