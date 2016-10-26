function Preadator() {
  this.x = [];
  this.y = [];
  this.segNum = 10;
  this.segLength = 12;
  this.atrMult = .3;
  this.head;
  this.hit = false;
  this.loc = createVector(300, 300);
  this.attractdTo;
  this.acc = createVector(random(.1, .9), random(-.9, .1));
	this.vel = createVector(1, 1);//random(-3,
  var close = 0;
  for( var i = 0; i < this.segNum; i++) {
    this.x.push(i);
    this.y.push(i);
  }

  this.update = function() {
    //this.vel.add(this.acc);
  //  this.vel.limit(2);
//    this.loc.add(this.vel);
  //this.loc.dist(boids[0].loc);



  //  print(this.loc);
    //this.attractedTo = close;
  //  this.vel.add(this.acc);
  //  this.loc.add(this.vel);
    //this.vel.limit(1);
  //  this.acc.mult(0);
    //this.calculateCloseBoid();
    for( var i = 1; i < boids.length; i++) {
      if(this.loc.dist(boids[i].loc) < this.loc.dist(boids[close].loc)) {
        close = i;
      }
    }
  if(this.loc.dist(boids[close].loc) < 20 && !this.hit) {

    boids.splice(close, 1);
    close= 0;
    countM++;//  this.calculateCloseBoid();
  }


if(this.loc.dist(boids[close].loc) < 500 && !boids[close].isIn) {
   this.force2 = p5.Vector.sub(boids[close].loc, this.loc);
    this.force2.normalize();
   this.force2.mult(this.atrMult);
    this.applyForce(this.force2);
    this.velLimit = 3;
  }
  this.vel.add(this.acc);
  this.loc.add(this.vel);
  this.vel.limit(3);
  this.acc.mult(0);
}
  //this.loc.add(this.vel);


  this.calculateCloseBoid = function(){
    for( var i = 1; i < boids.length; i++) {
      if(this.loc.dist(boids[i].loc) < this.loc.dist(boids[close].loc)) {
        close = i;
      }
    }
}

  this.render = function() {
  //  fill(0, 0, 255);
    this.drawSegment(0, this.loc.x, this.loc.y);
    for( var i=0; i < this.x.length-1; i++) {
      this.drawSegment(i+1, this.x[i], this.y[i], i);
    }
  }

  this.drawSegment = function(i, xin, yin, ind) {
    var dx = xin - this.x[i];
    var dy = yin - this.y[i];
    var angle = atan2(dy, dx);
    this.x[i] = xin - cos(angle) * this.segLength;
    this.y[i] = yin - sin(angle) * this.segLength;
    this.segment(this.x[i], this.y[i], angle, ind);
  }

  this.segment = function(x, y, a, ind){
    push();
          //fill(0,0,255);
    translate(x, y);

    strokeWeight(15-(ind/2));
    fill(255-10*ind, 0, 0, 200-ind*10);

   stroke(255,0,0,100);
    rotate(a);
    line(0, 0, this.segLength, 0);
    pop();
  }

  this.applyForce = function(f) {
    this.acc.add(f);
  }

  this.bounce = function() {

    if (this.loc.x > width || this.loc.x < 0 ) {
       this.vel.x *= (-1);
    }
    if (this.loc.y > height || this.loc.y < 0 ){
       this.vel.y *= (-1);
    }
    hit = collideCirclePoly(this.loc.x, this.loc.y, 40, poly, 10);
    if(hit){
       close = 0;
       this.vel.y *= (-1);
       this.vel.x *= (-1);
      //rotate(90);
    }

 }
}
