class Enemy extends gameObject {
  constructor(position, dificultad) {
    let spritesJugador = {
      base: {
        derecha: new ImagenDerogada("./Sprites/Player/Derecha.png"),
        izquierda: new ImagenDerogada("./Sprites/Enemys/Antioquia/Alien.png"),
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
    this.visionEnemigo = {
      izquierda: false,
      derecha: false,
    };
    this.dificultad = dificultad;
    this.cambiarOrientacion(-1);
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
  vision(ctx, posicionJugador) {
    this.dev = true;
    this.rangeVision = 450;
    this.minDerecha = this.posicion.x + this.size.w / 2;
    this.minIzquierda = this.posicion.x - this.rangeVision + this.size.w / 2;

    if (this.dev) {
      if (this.visionEnemigo.izquierda) {
        ctx.strokeStyle = "#00ffff";
        ctx.strokeRect(this.minIzquierda, this.posicion.y, this.rangeVision, this.size.h); //Vista hacia la izquierda
      }
      if (this.visionEnemigo.derecha) {
        ctx.strokeStyle = "#00ff00";
        ctx.strokeRect(this.minDerecha, this.posicion.y, this.rangeVision, this.size.h); // Vista hacia la derecha
      }
    }

    //Si me vio, correr hacia mi jaksdjakjsd, esto esta chido
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
  IA(position) {
    //Rotar, moverse y atacar
    if (this.visionEnemigo.izquierda) {
      this.cambiarOrientacion(-1);
    }
    if (this.visionEnemigo.derecha) {
      this.cambiarOrientacion(1);
    }

    //Atacare en tantos segundos
    this.disparar(this.orientacion, 1000 - this.dificultad * 20);
  }
  deteccionLado(min, max, positionX) {
    if (positionX >= min && positionX <= min + max) {
      return true;
    }
    return false;
  }
}
