class Flame extends Projectile {
  constructor(position, orientation) {
    super(
      position,
      orientation,
      {
        w: 100,
        h: 50,
      },
      10
    );
    this.Animator = new AnimatorEngine({
      states: ["Default"],
      tileWidth: 64,
      animations: {
        Default: {
          transitionTime: 200,
          loop: false,
          spriteSheet: {
            l: new ImagenDerogada("./Sprites/Balas/Fire/Fire-l.png"),
            r: new ImagenDerogada("./Sprites/Balas/Fire/Fire.png"),
          },
        },
      },
    });
    this.speed = 10;
    if (orientation != "R") {
      this.speed = -10;
    }
    console.log(this.orientation);
    this.sound = new Audio("./Sprites/Balas/Fire/Fireball.mp3");
    this.sound.play();
    this.Animator.changeState("Default");
    this.Animator.changeOrientation(this.orientation);
  }
  draw(context) {
    this.image = this.Animator.drawAnimation({
      h: 32,
      s: {
        w: 64,
        h: 100,
      },
    });
    super.draw(context);
    this.move();
  }
  move() {
    this.positionWorld.x += this.speed;
  }
}
