let palette = ['#F92003', '#00E3DF', '#FD299D'];
let points = [];
let factor;
function setup() {
	factor = 100;
	colorMode(HSB,360,100,100);
	createCanvas(windowWidth, windowHeight);
	
	palette = [];
	palette.push(color(33, 97/2, 99));
	palette.push(color(181, 99/2, 91));
	palette.push(color(327, 84/2, 99));
	
	for(let i=0;i<factor;i++){
		let p = {};
		p.col = palette[i%3];
		p.x = (width/factor) * i;
		p.y = 0;
		
		points.push(p);
	}
	
	background('black');
	noStroke();
}

function draw() {
	
	for(let i=0;i<factor;i++){
		let p = points[i];
		fill(p.col);
		let d = width/factor + random(10);
		circle(p.x, p.y, d);
		circle(p.x-width/factor/2, p.y, d/2);
		circle(p.x+width/factor/2, p.y, d/2);
		
		p.y += 1;
		p.x += random(-1,1) + 10*sin(millis()*PI);
	}
	
	
	
// 	// drawingContext.shadowBlur = 32;
// 	// drawingContext.shadowColor = palette[0];
// 	fill(palette[0]);
// 	circle(width/6, 0 + t, 50);
	
// 	// drawingContext.shadowColor = palette[1];
// 	fill(palette[1]);
// 	circle(3*width/6, height/2, 50);
	
// 	// drawingContext.shadowColor = palette[2];
// 	fill(palette[2]);
// 	circle(5*width/6, height/2, 50);
}