var numBoids = 50;
var boids = [];
var randomPoly = []
var hit = false;
var poly = [];
var player;
var sanke;
var sheep;
var index = 0;
var shep;
var counts = 10;
var countM = 0;
var saved = 0;
var bImage;
var counterText;
var pen;
var started;
var ended;
var sheepIn = 0;
var addBoids = 50;
var startS;
function setup() {
  started = false;
  ended = false;
  ///player = new Player();
  frameRate(600);
  startS = loadImage("start.png");
  pen = loadImage("pen (1).png");
  bImage = loadImage("grass2.png");
  sheep = loadImage("sheeps.png");
  shep = loadImage("shep.png");
	var cnv = createCanvas(1100, 900);
	var x = (windowWidth - width) / 2;
	var y = (windowHeight - height) / 2;
	cnv.position(x, y);

	stroke(200, 200, 0);
	fill(200, 200, 0);

	Boid.prototype = new Mover();
	loadBoids();
	loadPoly();

	//collideDebug(true)
  counterText = createP("0");
  counterText.position(100, 100);
  sanke = new Preadator();
  noCursor();
}

function draw() {
  if(!started && !ended) menu();
  if(started && !ended) layout();
  if(started && ended) gameOver();
}
function menu() {
//  background(255, 0, 0);
  image(startS, -12, 10)
//  textSize(50);
//  fill(255);
//  text("Click to Begin", 375, 100);

}
function mousePressed(){
  if(!started && !ended){
    started = true;
    ended = false;
  }

}

function gameOver() {
 background(0, 0, 255);
 textSize(50);
 fill(255);
 text("Refresh to Restart", 375, 100);
}

function loadTwice(addV){
//  for(var i = 0; i < boids.length; i++){
  //  boids.splice(i, 1);
  //  print(i);
  //}
  numBoids = numBoids + addV;

  for (var i = boids.length ; i < numBoids; i++) {
    var loc = createVector(random(width), random(height));
    print(2);
    while(loc.x < 700 && loc.x > 300 && loc.y > 100 && loc.y < 500) {
      loc = createVector(random(width), random(height));
    }
    var vel = createVector(random(-3, 3), random(-3,3));
    var acc = createVector(0,0);
    var clr = color(20,50,200);
    boids.push(new Boid(loc, vel, acc, clr, i));
  }


  counts = 0;
}

function loadPoly(){
  /*
	poly[0] = createVector(300,400);
	poly[1] = createVector(500,200);
	poly[2] = createVector(700,400);
  */

  poly[0] = createVector(400,420);
	poly[1] = createVector(400,220);
	poly[2] = createVector(600,220);
  poly[3] = createVector(600,420);

}
function drawPoly(){
	//fill(10,20,80,50);
//	beginShape();
	//for(i=0; i < poly.length; i++){
	//	vertex(poly[i].x,poly[i].y);
//	}
//	endShape(CLOSE);
image(pen, 400, 220, 200, 200);

	//ellipse(mouseX,mouseY,45,45);

	//hit = collideCirclePoly(mouseX,mouseY,45,poly,true);
	//enable the hit detection if the circle is wholly inside the polygon
	// hit = collideCirclePoly(mouseX,mouseY,45,poly,true);
	textSize(24);
	stroke(200, 100, 50);
	fill(200, 100, 50);
  //text("Hit = " + hit, 300, 400);

}
function loadBoids() {
	// create an attractor an set values
	attractor = new Mover();
	attractor.rad = 30;
	// create an repellor an set values
	repellor = new Mover();
	repellor.clr = color(255,50,0);
	for (var i = 0; i < numBoids; i++) {
		var loc = createVector(random(width), random(height));
		while(loc.x < 700 && loc.x > 300 && loc.y > 100 && loc.y < 500) {
			loc = createVector(random(width), random(height));
		}
		var vel = createVector(random(-3, 3), random(-3,3));
		var acc = createVector(0,0);
		var clr = color(20,50,200);
		boids.push(new Boid(loc, vel, acc, clr, i));
	}
}

function runBoids() {
	attractor.run();
	repellor.run();
	for (var i = 0; i < boids.length; i++) {
		boids[i].run(boids);
	}
}

setInterval(changeAttAcc, 1000);
setInterval(changeRepAcc, 1500);

function changeAttAcc() {
	attractor.acc = createVector(random(-.3, .3), random(-.3, .3));
}
function changeRepAcc() {
	repellor.acc = createVector(random(-.3, .3), random(-.3, .3));
}
function layout(){

  player = new Player();
  //background(0, 153, 51);
  image(bImage, -12, -10);
// fill(10, 40, 30, 24);
// rect(0, 0, width, height);
drawPoly();
runBoids();


//ellipse(423, 431, 6,6);
  sanke.update();
sanke.bounce();
sanke.render();


player.render();

for(var i = 0; i < boids.length; i++) {
  if(collideCirclePoly(boids[i].loc.x, boids[i].loc.y, 8, poly, true)) {
  boids[i].isIn = true;
  boids[i].clr = color(255, 0, 255);
  index = i;
  counts++;
  saved++;
  sheepIn++;
  }
}

counts =  counts - countM;
if(counts === 0){
  ended = true;
}
if(numBoids === saved + countM ){
  loadTwice(50);
  countM = 0;
}


counterText.style("font-size", "50px");
counterText.style("color", "#ff0000");

counterText.html("Score:" + counts);

sheepIn= 0;
counts = 10;
saved = 0;

}
