class Ghost extends Character {
  constructor(position) {
    let animationSet = {
      states: ["Estatico", "Caminar"],
      animations: [
        {
          id: "Estatico",
          transitionTime: 150,
          animaciones: {
            derecha: [
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile000.png"),
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile001.png"),
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile002.png"),
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile003.png"),
            ],
            izquierda: [
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile000.png"),
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile001.png"),
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile002.png"),
              new ImagenDerogada("./Sprites/Enemys/Fantasma/Estatico/tile003.png"),
            ],
          },
        },
      ],
    };
    super(
      position,
      { w: 50, h: 50 },
      animationSet.animations[0].animaciones.derecha[0],
      100,
      animationSet,
      new ImagenDerogada("./Sprites/Enemys/Antioquia/Face.png"),
      {
        bulletType: Bullet,
        coolDown: 1500,
      }
    );
    this.type = "Enemy";
    this.id = "Ghost";
    this.HUD = new enemyHUD("Enemigo", this.maxLife, "red", this.face, null, null);
  }
  move(vel) {
    if (this.canIMove.l || this.canIMove.r) {
      super.move(vel);
      this.orientation = "L";
      if (vel > 0) {
        this.orientation = "R";
      }
      this.animation.changeOrientation(this.orientation);
    }
  }
  AI(player = new Player(), bulletsArray) {
    //Cambiamos de estado si esta a 150px a movernos hacia el
    let rawDistance = player.positionWorld.x - this.positionWorld.x;
    let distance = Math.abs(rawDistance);
    if (distance < 300) {
      this.dev = true;
      if (rawDistance < 0) {
        this.move(-1);
        return;
      }
      this.move(1);
    } else {
      this.dev = false;
    }
  }
  draw(context) {
    if (!this.alive) {
      return;
    }
    if (!this.active) {
      return;
    }
    this.imagen = this.animation.drawAnimation();
    super.draw(context);
    this.drawBullets(context);
    if (this.dev) {
      this.collider.draw(context);
    }
  }
}
