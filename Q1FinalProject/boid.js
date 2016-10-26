function Boid(loc, vel, acc, clr, id) {
  this.acc = acc;
  this.vel = vel;
  this.loc = loc;
  this.clr = clr;
  this.id = id;
  this.repMult = .1;
  this.atrMult = .3;
  this.velLimit = 1.5;
  this.isIn = false;
  this.r = 3.0;
  this.attractToPlayer = true;
  this.maxspeed = 50;    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  this.r = 3.0;
  this.isRepelled;
  this.isControlled;

  this.force2= createVector(0, 0);

  this.run = function(boids) {
    this.flock(boids);
    this.update();
    this.checkEdges();
    this.render();
  }

  this.render = function() {
    var theta = this.vel.heading() + radians(90);
    fill(this.clr);
    stroke(255);

    push();
   image(sheep, this.loc.x, this.loc.y, 20, 20);
    //ellipse(this.loc.x, this.loc.y, 10 , 10);
    //translate(this.loc.x,this.loc.y);
    //  rotate(theta);
    //  beginShape();
    //  vertex(0, -this.r*2);
  //   vertex(-this.r, this.r*2);
    //  vertex(this.r, this.r*2);
    //  endShape(CLOSE);

  pop();
    //ellipse(this.loc.x, this.loc.y, 8, 8);
  }

  this.flock = function(boids) {
    var sep = this.separate(boids); // Separation
    var ali = this.align(boids);    // Alignment
    var coh = this.cohesion(boids); // Cohesion
    // Arbitrarily weight these forces
    sep.mult(2.5);
    ali.mult(2.0);
    coh.mult(1.0);
    // Add the force vectors to acceleration
    this.applyForce(sep);
    this.applyForce(ali);
    this.applyForce(coh);
  }

  this.seek = function(target) {
    var desired = p5.Vector.sub(target, this.loc); // A vector pointing from the location to the target
    // Normalize desired and scale to maximum speed
    desired.normalize();
    desired.mult(this.maxspeed);
    // Steering = Desired minus Velocity
    var steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxforce); // Limit to maximum steering force
    return steer;
  }

  this.separate = function(boids) {
    var desiredseparation = 25.0;
    var steer = createVector(0, 0);
    var count = 0;
    // For every boid in the system, check if it's too close
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.loc, boids[i].loc);
      // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
      if ((d > 0) && (d < desiredseparation)) {
        // Calculate vector pointing away from neighbor
        var diff = p5.Vector.sub(this.loc, boids[i].loc);
        diff.normalize();
        diff.div(d); // Weight by distance
        steer.add(diff);
        count++; // Keep track of how many
      }
    }
    // Average -- divide by how many
    if (count > 0) {
      steer.div(count);
    }
    // As long as the vector is greater than 0
    if (steer.mag() > 0) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.normalize();
      steer.mult(this.maxspeed);
      steer.sub(this.velocity);
      steer.limit(this.maxforce);
    }
    return steer;
  }

  this.align = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0);
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.loc, boids[i].loc);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].velocity);
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      sum.normalize();
      sum.mult(this.maxspeed);
      var steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxforce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  this.cohesion = function(boids) {
    var neighbordist = 50;
    var sum = createVector(0, 0); // Start with empty vector to accumulate all locations
    var count = 0;
    for (var i = 0; i < boids.length; i++) {
      var d = p5.Vector.dist(this.loc, boids[i].loc);
      if ((d > 0) && (d < neighbordist)) {
        sum.add(boids[i].loc); // Add location
        count++;
      }
    }
    if (count > 0) {
      sum.div(count);
      return this.seek(sum); // Steer towards the location
    } else {
      return createVector(0, 0);
    }
  }

  this.update = function() {
//    this.repelled = false;
    if(this.loc.dist(player.loc) < 100 && this.attractToPlayer){
      this.force2 = p5.Vector.sub(player.loc, this.loc);
      this.force2.normalize();
      this.force2.mult(this.atrMult);
      this.applyForce(this.force2);
      this.velLimit = 2;
      this.isRepelled = true;
}
    //}
  //  else {
    //  this.isRepelled = false;
  //  }

     if(this.loc.dist(attractor.loc) < 250 && !this.isRepelled){
       this.force = p5.Vector.sub(attractor.loc, this.loc);
       this.force.normalize();
       this.force.mult(-1);
       this.applyForce(this.force);

      // this.velLimit = 5;
     }
     if(this.isIn){
      //this.isRepelled = true;
      //thhis.isRepelled= true;
      this.attractToPlayer = false;
      this.force = p5.Vector.sub(attractor.loc, this.loc);
      this.force.normalize();
      this.force.mult(this.atrMult);
      this.applyForce(this.force);
      this.velLimit = 3;
  //  boids.splice(index, 1);
  //  close = 0;

    }
    this.vel.add(acc);
    this.loc.add(this.vel);
    this.vel.limit(this.velLimit);
    this.acc.mult(0);
  }

  this.checkEdges = function() {
    if (this.loc.x > width || this.loc.x < 0) this.vel.x *= (-1);
    if (this.loc.y > height || this.loc.y < 0) this.vel.y *= (-1);
  }
}
