let points = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('white');
	noFill();
	stroke('black');
	
	for(let i=0; i<400; i++){
		let p = {};
		p.x = random(0,width/2 - 30);
		p.y = random(height/2 + 30, height);
		p.px = p.x;
		p.py = p.y;
		p.color = random() > 0.7 ? 'white' : 'black';
		
		// calc slope to the center
		// our step size is along the x-axis, 1 at a time
		let centerX = random(width/2 - 5, width/2 + 5);
		let centerY = random(height/2 - 5, height/2 + 5);
		let slope = (p.y - centerY) / (centerX - p.x);
		p.vx = 1;
		p.vy = -slope;
		
		points.push(p);
	}
	
	strokeWeight(1);
	circle(width/2, height/2, 50);
}

function draw() {
	points.forEach((p) => {
		stroke(p.color);
		line(p.px,p.py,p.x,p.y);

		p.x += p.vx;
		p.y += p.vy;
		
		p.px = p.x;
		p.py = p.y;
	});
}