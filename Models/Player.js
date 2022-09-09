class Player extends gameObject {
  constructor() {
    super("Player", { x: 500, y: 0 });

    this.size = {
      w: 50,
      h: 100,
    };
    this.imagenesOrientacion = [new Image(), new Image()]; // 0 Derecha, 1 Izquierda
    this.imagenesOrientacion[0].src = "./Sprites/Player/Derecha.png";
    this.imagenesOrientacion[1].src = "./Sprites/Player/Izquierda.png";

    this.vida = 100;
    this.vidaHUD = new Vida("Player", this.vida);
    this.disparoSonido = new Audio("./Sprites/Player/Sound/disparo.mp3");
    this.orientacion = "D";
    this.cambiarImagen();
  }
  cambiarImagen() {
    if (this.orientacion == "D") {
      this.imgBase = this.imagenesOrientacion[0];
      return;
    }
    this.imgBase = this.imagenesOrientacion[1];
    return;
  }
  mover(vel) {
    super.mover(vel);
    if (vel >= 0) {
      this.cambiarOrientacion("D"); //Mira hacia la derecha
    } else {
      this.cambiarOrientacion("L"); //Mira hacia la izquierda
    }
  }
  cambiarOrientacion(leftOrRigth) {
    this.orientacion = leftOrRigth;
    this.cambiarImagen();
  }
  dibujar(ctx, canvasPosition) {
    super.dibujar(ctx);
    this.vidaHUD.dibujar(ctx, canvasPosition);
  }
  recibirDano() {
    console.log("Recibi damage");
    this.vidaHUD.recibirDano(10);
  }
  disparar() {
    if (this.canIshoot) {
      if (!this.disparoSonido.paused) {
        this.disparoSonido.currentTime = 0;
        this.disparoSonido.play();
      } else {
        this.disparoSonido.play();
      }
      super.disparar(this.orientacion);
    }
  }
}
