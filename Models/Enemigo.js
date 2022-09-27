class Enemy extends gameObject {
  constructor(position, dificultad) {
    let spriteJugador = {
      frame: 0,
      state: ["Estatico", "Caminando", "Saltando", "Cayendo"],
      animaciones: [
        {
          Id: "Estatico",
          loop: false,
          velocidad: 0,
          animaciones: {
            derecha: [new ImagenDerogada("./Sprites/Enemys/Antioquia/Estatico/Derecha.png")],
            izquierda: [new ImagenDerogada("./Sprites/Enemys/Antioquia/Estatico/Izquierda.png")],
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
            derecha: [new ImagenDerogada("./Sprites/Enemys/Antioquia/Salto/Derecha/Pose1.png")],
            izquierda: [new ImagenDerogada("./Sprites/Enemys/Antioquia/Salto/Izquierda/Pose1.png")],
          },
        },
        {
          Id: "Cayendo",
          loop: false,
          velocidad: 0,
          animaciones: {
            derecha: [new ImagenDerogada("./Sprites/Enemys/Antioquia/Cayendo/Derecha.png")],
            izquierda: [new ImagenDerogada("./Sprites/Enemys/Antioquia/Cayendo/Izquierda.png")],
          },
        },
      ],
    };
    let face = new ImagenDerogada("./Sprites/Enemys/Antioquia/Face.png");
    super("Enemigo", position, spriteJugador, face);
    this.size = {
      w: 50,
      h: 100,
    };
    this.imgBase = new Image();
    this.vida = 100;
    this.imgBase.src = "./Sprites/Enemys/Antioquia/Estatico/Derecha.png";
    this.dificultad = dificultad;
    this.vidaHUD = new BarraVida(this.tag, this.vida, "#ffffff", this.face, this.dificultad);
    this.visible = true;
    this.alive = true;
    this.visionEnemigo = {
      izquierda: false,
      derecha: false,
    };
    this.cambiarOrientacion(-1);
  }
  dibujar(ctx) {
    if (!this.visible) return;
    if (this.alive == false) return;

    this.cambiarEstado();
    super.dibujar(ctx);
  }
  getVida(ctx, canvasPosicion) {
    if (!this.visible) return;
    if (this.alive == false) return;

    this.vidaHUD.dibujar(ctx, canvasPosicion);
  }
  cambiarEstado() {
    this.animacion.obtenerEstadoDeMovimiento(this.isGround, this.caminando, this.saltando);
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
  vision(posicionJugador) {
    this.dev = false;
    this.rangeVision = 450;
    this.minDerecha = this.posicion.x + this.size.w / 2;
    this.minIzquierda = this.posicion.x - this.rangeVision + this.size.w / 2;

    this.visionEnemigo.derecha = this.deteccionLado(
      this.minDerecha,
      this.rangeVision,
      posicionJugador.x
    ); // deteccion lado derecho
    this.visionEnemigo.izquierda = this.deteccionLado(
      this.minIzquierda,
      this.rangeVision,
      posicionJugador.x
    ); // deteccion lado derecho

    if (this.visionEnemigo.izquierda || this.visionEnemigo.derecha) {
      this.IA();
      //Girar hacia el lado donde esta el enemigo
    }
  }
  IA() {
    //Rotar, moverse y atacar
    if (this.visionEnemigo.izquierda) {
      this.cambiarOrientacion(-1);
    }
    if (this.visionEnemigo.derecha) {
      this.cambiarOrientacion(1);
    }

    //Atacare en tantos segundos
    if (this.alive) {
      this.disparar(this.orientacion, 250 + this.dificultad * 250);
    }
  }
  deteccionLado(min, max, positionX) {
    if (positionX >= min && positionX <= min + max) {
      return true;
    }
    return false;
  }
}
