class Player extends gameObject {
  constructor() {
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
        timeTransition: 100,
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
    super("Player", { x: 500, y: 0 }, spritesJugador);

    this.size = {
      w: 50,
      h: 100,
    };
    this.imgBase = new Image();
    this.imgBase.src = "./Sprites/Player/Derecha.png";

    this.vida = 100;
    this.vidaHUD = new Vida("Player", this.vida);
    this.disparoSonido = new Audio("./Sprites/Player/Sound/disparo.mp3");
    this.vivo = true;
  }
  dibujar(ctx, canvasPosition) {
    // if (this.vivo) {
    super.dibujar(ctx);
    this.vidaHUD.dibujar(ctx, canvasPosition);
    // }
  }
  recibirDano() {
    this.vida -= 10;
    if (this.vida >= 0) {
      this.vidaHUD.recibirDano(10);
      // this.vivo = false;
    } else {
      console.log("Me mataron");
    }
  }
  disparar() {
    if (this.canIshoot) {
      if (!this.disparoSonido.paused) {
        this.disparoSonido.currentTime = 0;
        this.disparoSonido.play();
      } else {
        this.disparoSonido.play();
      }
      super.disparar(this.orientacion, 150);
    }
  }
}
