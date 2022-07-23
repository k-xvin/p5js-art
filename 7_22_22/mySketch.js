// OPC.toggle('blend_DODGE', false);
// OPC.toggle('blend_BURN', false);

// OPC.button('blendButton', 'cycle blendmode');

//https://coolors.co/1e1e24-c19ab7-9c95dc-228cdb-0b7189
let palette = ["#1e1e24","#c19ab7","#9c95dc","#228cdb","#0b7189"];
let scaleFactor = 10;
let t;
let bgColor;
let points = [];
let blendCycle = 0;
function setup() {
	blendCycle = 0;
	createCanvas(windowWidth, windowHeight);
	strokeWeight(5);
	stroke(palette[1]);
	t = 0;
	bgColor = color(palette[0]);
	
	noFill();
	for(let i=0;i<500;i++){
		// circle(random(50,300)*cos(t), random(50,300)*sin(t)+10*sin(t), 20);
		let ppoint = p5.Vector.random2D().mult(random(50,windowWidth));
		let col = color(palette[floor(random(1,5))]);
		col.setAlpha(200);
		points[i] = {
			"x": ppoint.x, 
			"y": ppoint.y,
			"timeOffset": random(0, PI),
			"col": col
		};
	}
	
	background(bgColor);

    frameRate(30);
    createLoop({duration:3, gif:{download: true, fileName:"7_22_22.gif"}});
}

function draw() {
	if(blendCycle == 0){
		blendMode(DODGE);
	}
	else if(blendCycle == 1){
		blendMode(BURN);
	}
	else{
		blendMode(NORMAL);
		bgColor.setAlpha(30);
		background(bgColor);
	}
	
	
	translate(windowWidth/2, windowHeight/2);
	
	t += 0.01;
	for(let i=0;i<500;i++){
		stroke(points[i].col);
		let timeWithOffset = t + points[i].timeOffset;
		point(points[i].x*cos(timeWithOffset)*sin(timeWithOffset)*cos(timeWithOffset), 
					 points[i].y*sin(timeWithOffset)*cos(timeWithOffset)*sin(timeWithOffset), 
					 );
		
	}
	
}

function buttonPressed(variableName) {
	if(variableName == 'blendButton'){
		if(blendCycle < 2){
			blendCycle++;
			bgColor.setAlpha(255);
			clear();
		}
		else {
			blendCycle = 0;
		}
		console.log(blendCycle);
	}
}