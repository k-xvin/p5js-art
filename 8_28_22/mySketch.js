let points = [];
function setup() {
	createCanvas(800, 800);
	
	for(let i=0;i<100;i++){
		let p = {};
		// p.x = random(width/8, 7*width/8);
		// p.y = random(height/8, 7*height/8);
		p.x = i*width/100;
		p.y = height/2+sin(8*TAU*(p.x/width))*height/4*(p.x/width);
		p.r = 5;
		points.push(p);
	}
	
	background('white');
	stroke('black');
}

function draw() {
	points.forEach((p) => {
		// fill('black');
		// circle(p.x,p.y,5);		
		noFill();
		circle(p.x,p.y,p.r*2);
		
		if(p.r < 50){
			p.r += 5;
		}
	});
	
	// if(millis() > 3000){
	// 	saveCanvas("8_28_22","png");
	// }
}

function getClosestPoint(x,y){
	for(let i=0;i<points.length;i++){
		
	}
}