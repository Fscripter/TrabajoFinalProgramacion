class Laser extends Projectile {
  constructor(posicion, orientation) {
    super(posicion, orientation, {
      w: 100,
      h: 3,
    });
    this.image = new ImagenDerogada("./Sprites/Balas/Laser.png");
    this.speed = 15;
    if (this.orientation == "L") {
      this.speed *= -1;
    }
    this.sound = new Audio("./Sprites/Player/Sound/laser.mp3");
    this.sound.play();
  }
  move() {
    this.positionWorld.x += this.speed;
  }
  draw(context) {
    super.draw(context);
    this.move();
  }
}
