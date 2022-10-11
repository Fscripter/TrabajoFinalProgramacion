class Flamethrower extends Projectile {
  constructor(position, orientation) {
    super(
      position,
      orientation,
      {
        w: 100,
        h: 50,
      },
      1
    );
    this.animation = new Animator(
      {
        states: ["living"],
        animations: [
          {
            id: "living",
            transitionTime: 20,
            loop: false,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/1.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/2.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/3.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/4.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/5.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/6.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/7.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/derecha/8.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/1.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/2.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/3.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/4.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/5.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/6.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/7.png"),
                new ImagenDerogada("./Sprites/Balas/Flamethrower/izquierda/8.png"),
              ],
            },
          },
        ],
      },
      this.orientation
    );
    this.collision = new Collision(this);
  }
  draw(context) {
    this.image = this.animation.drawAnimation();
    if (this.animation.lastFrame) {
      this.delete();
    }
    super.draw(context);
    this.collision.draw(context);
  }
  update(position, orientation) {
    this.positionWorld = position;
    this.orientation = orientation;
  }
}
