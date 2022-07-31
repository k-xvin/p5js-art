let points = [];
let timeMax;
let t = 0;
let circleSize;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('#A63A50');
	fill('#F0E7D8');
	stroke('#F0E7D8');
	strokeWeight(1);
	
	timeMax = 4000;
	
	let radius = min(width, height)/4;
	for(let i=1; i<200; i++){
		let p = {};
		p.x = width/2 + radius*cos((TAU/200) * i) + random(-2,2);
		p.y = height/3 + radius*sin((TAU/200) * i) + random(-2,2);
		
		p.travelRate = random();
		
		p.prevX = p.x;
		p.prevY = p.y;		
		
		points.push(p);
		
	}
	points.sort((a,b) => {
		return a.x - b.x
	});
	
	push();
	noFill();
	strokeWeight(3);
	circle(width/2,height/3,radius*2);
	pop();
	
	// frameRate(30);
	// createLoop({duration:7, gif:{open:true, download:true, fileName:"7_30_22.gif"}});
}

function draw() {
	t+=0.05;
	
	let sWeight = 5-pow(t,1.1);
	if(sWeight < 0.5){
		strokeWeight(0.5);
	}
	else {
		strokeWeight(5-pow(t,1.1));
	}
	points.forEach((p) => {
		if(millis() > timeMax){
			p.y += random()/10;
		}
		else {
			p.x += random(-0.5, 0.5);
			p.y += p.travelRate + random();
		}
		
		line(p.x,p.y,p.prevX,p.prevY);
		
		p.prevX = p.x;
		p.prevY = p.y;
		
	});
	
	if(millis() > timeMax + 500) noLoop();
}