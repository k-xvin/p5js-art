OPC.toggle('has_stroke', false);

//https://coolors.co/e3d8f1-dabeca-bf8b85-ad8a64-5d5f71
let palette = ["#e3d8f1","#dabeca","#bf8b85","#ad8a64","#5d5f71"];
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('black');
	// background(palette[1]);
	prepareTexture(windowWidth, windowHeight);
}

function draw() {
	// has_stroke ? stroke('black'): noStroke();
	clear();
	// background(palette[1]);
	image(textureGfx, 0, 0);
	// let c0 = color(palette[1]);
	// c0.setAlpha(100);
	// fill(c0);
	// rect(0,0,windowWidth, windowHeight);
	
	// fill(palette[4]);
	// drawPetal(windowWidth/2,windowHeight/2, 150, PI/3, 5, 0.6);
	// fill(palette[2]);
	// drawPetal(windowWidth/2,windowHeight/2, 100, PI/3, 5, 0.6);
	
	let c1 = color(palette[4]);
	c1.setAlpha(200);
	let c2 = color(palette[2]);
	c2.setAlpha(200);
	
	translate(windowWidth/2,windowHeight/2);
	for(let i=0; i< 50; i++){
		fill(c1);
		drawPetal(0,0, random(10,120), PI/8, random(1,10), 0.6);
		rotate(random(0,PI/4));
		fill(c2);
		drawPetal(0,0, random(10,120), PI/8, random(1,10), 0.6);
	}
	
	// noLoop();
	frameRate(1);
}



let currR;
function drawPetal(x,y,d,angle,depth,shrinkFactor) {
	let r = d/2;
	currR = r;
	push();
	
	for(let i=1;i<depth+1;i++){
		if(i==1) {
			// origin circle
			translate(x,y);
			circle(0,0,currR*2);
			currR *= shrinkFactor;
		}
		else {
			rotate(angle);
			translate(r+currR,0);
			// add next child
			// circle(0,0,20);
			circle(currR,0,currR*2);
			currR *= shrinkFactor;
		}
		
	}
	
	// // add child
	// rotate(angle);
	// circle(0+r,0,r);
	pop();
}

// texture taken from 
// https://github.com/tetunori/BMWalker.js/blob/main/sample/app-01/texture.js
let textureGfx;
const prepareTexture = (w,h) => {
  textureGfx = createGraphics(w,h);
  textureGfx.noStroke();

  // white texture
  const textureColor = color(255);
  textureColor.setAlpha(30);
  textureGfx.fill(textureColor);
  for (let i = 0; i < 100000; i++) {
    textureGfx.circle(random(w), random(h), (noise(i) * w) / 360);
  }
};