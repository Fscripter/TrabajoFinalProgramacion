class Player extends gameObject {
  constructor() {
    let spriteJugador = {
      frame: 0,
      state: ["Estatico", "Caminando", "Saltando", "Cayendo"],
      animaciones: [
        {
          Id: "Estatico",
          loop: false,
          velocidad: 0,
          animaciones: {
            derecha: [new ImagenDerogada("./Sprites/Player/Derecha.png")],
            izquierda: [new ImagenDerogada("./Sprites/Player/Izquierda.png")],
          },
        },
        {
          Id: "Caminando",
          loop: true,
          velocidad: 6,
          animaciones: {
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
          },
        },
        {
          Id: "Saltando",
          loop: false,
          velocidad: 0,
          animaciones: {
            derecha: [new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose1.png")],
            izquierda: [new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose1.png")],
          },
        },
        {
          Id: "Cayendo",
          loop: false,
          velocidad: 0,
          animaciones: {
            derecha: [new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose6.png")],
            izquierda: [new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose6.png")],
          },
        },
      ],
    };

    super("Player", { x: 500, y: 0 }, spriteJugador);

    this.size = {
      w: 50,
      h: 100,
    };
    this.imgBase = new Image();
    this.imgBase.src = "./Sprites/Player/Derecha.png";

    this.vida = 100;
    this.vidaHUD = new BarraVida("Player", this.vida, "#00ff00");
    this.disparoSonido = new Audio("./Sprites/Player/Sound/disparo.mp3");
    this.vivo = true;
    this.caminando = false;
    this.saltando = false;
  }
  dibujar(ctx, canvasPosition) {
    this.cambiarEstado();
    super.dibujar(ctx);
    this.vidaHUD.dibujar(ctx, {
      x: this.posicion.x - 250,
      y: -canvasPosition.y + 15,
    });
  }
  cambiarEstado() {
    this.animacion.obtenerEstadoDeMovimiento(this.isGround, this.caminando, this.saltando);
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
