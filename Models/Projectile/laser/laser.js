class Laser extends Projectile {
  constructor(posicion, orientation) {
    super(posicion, orientation, {
      w: 100,
      h: 10,
    });
    this.animation = new Animator(
      {
        states: ["living"],
        animations: [
          {
            id: "living",
            transitionTime: 50,
            loop: false,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Balas/Laser/Right/1.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Right/2.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Right/3.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Right/4.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Right/5.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Right/6.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Right/7.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Balas/Laser/Left/1.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Left/2.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Left/3.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Left/4.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Left/5.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Left/6.png"),
                new ImagenDerogada("./Sprites/Balas/Laser/Left/7.png"),
              ],
            },
          },
        ],
      },
      this.orientation
    );
    this.speed = 12;
    if (this.orientation == "L") {
      this.speed *= -1;
    }
    this.sound = new Audio("./Sprites/Player/Sound/laser.mp3");
    this.sound.play();
    this.damage = 30;
  }
  move() {
    this.positionWorld.x += this.speed;
  }
  draw(context) {
    this.move();
    this.image = this.animation.drawAnimation();
    if (this.animation.lastFrame) {
      this.delete();
    }
    super.draw(context);
  }
}
