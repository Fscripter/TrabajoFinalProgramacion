class Bullet extends Projectile {
  constructor(position, orientation) {
    let size = {
      w: 10,
      h: 5,
    };
    super(position, orientation, size);
    this.damage = 30;
    this.image.src = "./Models/Projectile/bullet/bullet.png";
    this.speed = 30;
    if (orientation != "R") {
      this.speed = -30;
    }
    this.sound = new Audio("./Sprites/Player/Sound/disparo.mp3");
    this.sound.play();
  }
  draw(context) {
    super.draw(context);
    this.move();
  }
  move() {
    this.positionWorld.x += this.speed;
  }
}
