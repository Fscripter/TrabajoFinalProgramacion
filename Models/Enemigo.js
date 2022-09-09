class Enemy extends gameObject {
  constructor(position) {
    let spritesJugador = {
      base: {
        derecha: new ImagenDerogada("./Sprites/Player/Derecha.png"),
        izquierda: new ImagenDerogada("./Sprites/Player/Izquierda.png"),
        loop: true,
      },
      caminar: {
        derecha: [
          new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose2.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose3.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose4.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose5.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose6.png"),
        ],
        izquierda: [
          new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose1.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose2.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose3.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose4.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose5.png"),
          new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose6.png"),
        ],
        loop: true,
        maxFrame: 4,
        timeTransition: 25,
      },
      saltar: {
        derecha: [
          new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose1.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose2.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose3.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose4.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose5.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose6.png"),
        ],
        izquierda: [
          new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose1.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose2.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose3.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose4.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose5.png"),
          new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose6.png"),
        ],
        loop: false,
        maxFrame: 4,
        timeTransition: 10,
      },
      caer: {
        derecha: new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose6.png"),
        izquierda: new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose6.png"),
        loop: false,
        maxFrame: 4,
        timeTransition: 10,
      },
    };

    super("Enemigo", position, spritesJugador);
    this.size = {
      w: 50,
      h: 100,
    };
    this.imgBase = new Image();
    this.vida = 100;
    this.imgBase.src = "./Sprites/Enemys/Antioquia/alien.png";
    this.vidaHUD = new Vida("Enemigo", this.vida, "r");
    this.visible = true;
    this.alive = true;
  }
  dibujar(ctx) {
    if (!this.visible) return;
    if (this.alive == false) return;

    super.dibujar(ctx);
  }
  getVida(ctx, canvasPosicion) {
    if (!this.visible) return;
    if (this.alive == false) return;

    this.vidaHUD.dibujarNormal(ctx, canvasPosicion);
  }
  recibirDano() {
    if (this.vida > 10) {
      this.vida -= 10;
      this.vidaHUD.recibirDano(10);
    } else {
      this.alive = false;
    }
  }
  hide() {
    this.visible = false;
  }
  show() {
    this.visible = true;
  }
}
