class Footlight extends Character {
  constructor(position) {
    let animationSet = {
      states: ["Default", "Caminar"],
      tileWidth: 32,
      animations: {
        Default: {
          transitionTime: 200,
          loop: true,
          spriteSheet: {
            l: new ImagenDerogada("./Sprites/Enemys/Candileja/Idle/Candileja-l.png"),
            r: new ImagenDerogada("./Sprites/Enemys/Candileja/Idle/Candileja.png"),
          },
        },
        Caminar: {
          transitionTime: 200,
          loop: true,
          spriteSheet: {
            l: new ImagenDerogada("./Sprites/Enemys/Candileja/Caminar/Candileja-l.png"),
            r: new ImagenDerogada("./Sprites/Enemys/Candileja/Caminar/Candileja.png"),
          },
        },
      },
    };
    super(
      position,
      { w: 50, h: 50 },
      new ImagenDerogada("./Sprites/Enemys/Antioquia/Face.png"),
      100,
      animationSet,
      new ImagenDerogada("./Sprites/Enemys/Antioquia/Face.png"),
      {
        bulletType: Flame,
        coolDown: 1500,
      }
    );
    this.type = "Enemy";
    this.id = "Footligth";
    this.HUD = new enemyHUD("Enemigo", this.maxLife, "red", this.face, null, null);
  }
  move(vel) {
    if (this.canIMove.l || this.canIMove.r) {
      super.move(vel);
      this.orientation = "L";
      if (vel > 0) {
        this.orientation = "R";
      }
      this.Animator.changeOrientation(this.orientation);
    }
  }
  AI(player = new Player(), bulletsArray) {
    //Cambiamos de estado si esta a 150px a movernos hacia el
    let rawDistance = player.positionWorld.x - this.positionWorld.x;
    let distance = Math.abs(rawDistance);

    if (distance < 300) {
      this.shoot();
    }
    if (rawDistance < 0) {
      this.move(-1);
      return;
    }
    this.move(1);
  }
  draw(context) {
    if (!this.alive) {
      return;
    }
    if (!this.active) {
      return;
    }
    this.imagen = this.Animator.drawAnimation();
    context.drawImage(this.imagen, this.positionWorld.x, this.positionWorld.y);
    this.drawBullets(context);
    if (this.dev) {
      this.collider.draw(context);
    }
  }
}
