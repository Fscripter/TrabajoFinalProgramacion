class Player extends gameObject {
  constructor() {
    super("Player", { x: 500, y: 0 });

    this.size = {
      w: 50,
      h: 100,
    };
    this.spritesJugador = {
      base: {
        izquierda: "./Sprites/Player/Izquierda.png",
        derecha: "./Sprites/Player/Derecha.png",
      },
      caminar: {
        izquierda: [],
      },
    };
    this.imgBase = new Image();
    this.imgBase.src = "./Sprites/Player/Derecha.png";

    this.vida = 100;
    this.vidaHUD = new Vida("Player", this.vida);
    this.disparoSonido = new Audio("./Sprites/Player/Sound/disparo.mp3");
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
