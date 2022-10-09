class Laser extends Projectile {
  constructor(posicion, orientation) {
    super(posicion, orientation, {
      w: 100,
      h: 3,
    });
    this.image = new ImagenDerogada("./Sprites/Balas/Laser.png");
    this.speed = 10;
    if (this.orientation == "L") {
      this.speed *= -1;
    }
  }
  move() {
    this.positionWorld.x += this.speed;
  }
  draw(context) {
    this.move();
    super.draw(context);
    console.log(this.positionWorld);
  }
}
