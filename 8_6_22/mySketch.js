let points = [];
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('#A63A50');
	stroke('#F0E7D8');
	strokeWeight(10);
	noFill();
	
	for(let i=0;i<100;i++){
		let p = {};
		p.x = random(0,width);
		p.y = random(0,height);
		p.vx = random() > 0.5 ? -1 : 1;
		p.vy = random() > 0.5 ? -1 : 1;
		p.px = p.x;
		p.py = p.y;
		p.stepsBeforeTurn = random(50,100);
		p.currentStep = 0;
		p.sWeight = random(1,10);
		
		points.push(p);
	}
	
	frameRate(30);
	createLoop({duration:10, gif:{open:true, download:true, fileName:"8_6_22.gif"}});
}

function draw() {
	points.forEach((p) => {
		p.x += p.vx;
		p.y += p.vy;
		
		if(p.currentStep > p.stepsBeforeTurn){
			if(random() > 0.5){
				p.vx *= -1;
			}
			else {
				p.vy *= -1;
			}
			
			p.currentStep = 0;
		}
		
		strokeWeight(p.sWeight);
		line(p.px,p.py,
				 p.x,p.y);
		
		// point(p.x,p.y);
		// point(p.px,p.py);
		
		p.currentStep += 1;
		p.px = p.x;
		p.py = p.y;
	});
}