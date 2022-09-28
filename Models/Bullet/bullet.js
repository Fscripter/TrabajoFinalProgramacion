class Bullet extends GameObject {
  constructor(position, size, baseUrl, orientation, callback) {
    super(position, size, baseUrl);
    this.orientation = orientation;
    this.speed = 10;
    if (this.orientation == "L") {
      this.speed = -10;
    }
    this.lifeTime = 0; // seconds alive
    this.deathTime = 3; // death time
    this.id = new Date();
    this.callback = callback;
  }
  move() {
    this.positionWorld.x += this.speed;
  }
  draw(context) {
    this.checkLife();
    super.draw(context);
    this.move();
  }
  checkLife() {
    this.lifeTime += 60 / 1000;
    if (this.lifeTime > this.deathTime) {
      this.delete();
    }
  }
  delete() {
    this.callback.map((bullet, index) => {
      if (bullet.id == this.id) {
        this.id = index;
      }
    });
    this.callback.splice(this.id, 1);
  }
}
