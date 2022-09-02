function setup() {
	createCanvas(800,800);
	background('white');
	
	noFill();
	stroke('black');
}

function draw() {
	strokeWeight(7);
	for(let i=0; i<20; i++){
		circle(width/2, height, i*20);
	}
	
	// fill('black');
	textFont('times new roman');
	textSize(64);
	for(let i=20; i>1; i--){
		strokeWeight(i/5);
		if(i==20){
			fill('black');
		}
		else {
			noFill();
		}
		text("cranium wizard", width/4 - (20-i)*20, height/2 - (20-i)*20);
	}
	
	saveCanvas("9_1_22", "png");
	
	noLoop();
}