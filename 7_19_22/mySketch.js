let prev;
let maxRad;
let iteration;
let leftCount;
let rightCount;
let downCount;
let upCount;
let maxDist;
function setup() {
	createCanvas(windowWidth, windowHeight);
	background('#EBE1C8');
	fill('#90AA86');
	prev = [windowWidth/2,windowHeight/2,50,50];
	rectMode(RADIUS);
	maxRad = 20;
	iteration = 0;
	maxDist = createVector(0,0).dist(createVector(windowWidth/2,windowHeight/2));
}

function draw() {
	// prev = spawnNewSquare(prev[0],prev[1],prev[2]);
	
	// let distFromCenter = createVector(windowWidth/2,windowHeight/2)
	// .dist(createVector(prev[0],prev[1]));
	// console.log(distFromCenter);
	// maxRad = 50 - 40*(floor(distFromCenter/maxDist));
	
	if(iteration==0){
		prev = spawnRight(prev[0],prev[1],prev[2]);
		rightCount++;
		if(random() < 0.3) iteration++;
	}
	else if(iteration==1){
		prev = spawnUp(prev[0],prev[1],prev[2]);
		upCount++;
		if(random() < 0.3) iteration++;
	}
	else if(iteration==2){
		prev = spawnLeft(prev[0],prev[1],prev[2]);
		leftCount++;
		if(random() < 0.3) iteration++;
	}
	else if(iteration==3){
		prev = spawnDown(prev[0],prev[1],prev[2]);
		downCount++;
		if(random() < 0.3) iteration++;
	}
	
	if(iteration > 3){
		 iteration = 0;
	}
	
	
	if(prev[0] < 0 || prev[0] > windowWidth || 
		 prev[1] < 0 || prev[1] > windowHeight){
		prev = [windowWidth/2,windowHeight/2,50,50];
		clear();
		// noLoop();
	}
	
	// noLoop();
}

function coolRect(cX, cY, radius){
	push();
	let col = color('#90AA86');
	// col.setAlpha(200);
	fill(col);
	rect(cX, cY, radius/2, radius/2);
	
	col = color('#4A2545');
	// col.setAlpha(200);
	fill(col);
	rect(cX+random(5), cY, radius/2, radius/2);
	
	col = color('#824C71');
	// col.setAlpha(200);
	fill(col);
	rect(cX, cY+random(5), radius/2, radius/2);
	
	col = color('#90AA86');
	// col.setAlpha(200);
	fill(col);
	rect(cX+random(5), cY+random(5), radius/2, radius/2);
	pop();
}

function spawnUp(cX, cY, radius){
	let newRadius = random(1,maxRad);
	let newCenterX = cX;
	let newCenterY = cY;
	
	newCenterY = cY - (radius + newRadius);
	
	coolRect(newCenterX, newCenterY, newRadius);
	return [newCenterX, newCenterY, newRadius];
}
function spawnDown(cX, cY, radius){
	let newRadius = random(1,maxRad);
	let newCenterX = cX;
	let newCenterY = cY;
	
	newCenterY = cY + (radius + newRadius);
	
	coolRect(newCenterX, newCenterY, newRadius);
	return [newCenterX, newCenterY, newRadius];
}
function spawnLeft(cX, cY, radius){
	let newRadius = random(1,maxRad);
	let newCenterX = cX;
	let newCenterY = cY;
	
	newCenterX = cX - (radius + newRadius);
	
	coolRect(newCenterX, newCenterY, newRadius);
	return [newCenterX, newCenterY, newRadius];
}
function spawnRight(cX, cY, radius){
	let newRadius = random(1,maxRad);
	let newCenterX = cX;
	let newCenterY = cY;
	
	newCenterX = cX + (radius + newRadius);
	
	coolRect(newCenterX, newCenterY, newRadius);
	return [newCenterX, newCenterY, newRadius];
}