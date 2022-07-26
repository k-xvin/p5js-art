function setup() {
	createCanvas(windowWidth, windowHeight);
	background("#f8c7cc");
	stroke("#81a684");
	strokeWeight(30);
	noFill();
	blendMode(BURN);
	strokeCap(SQUARE);	
	
	border = windowWidth/10;
	x = border;
}

let border = 0;
let x = 0;
function draw() {
	if(x>windowWidth-windowWidth/10){
		noLoop();
	}
	
	// circle(mouseX, mouseY, 20);
	
	// line(x,0,x,windowHeight);
	x += 10;
	beginShape();
	for(let i=0;i<100;i++){
		let y = border + i*(windowHeight-border*2)/100 + random(0,20);
		vertex(x+random(0,20),y);
	}
	endShape();
	
}