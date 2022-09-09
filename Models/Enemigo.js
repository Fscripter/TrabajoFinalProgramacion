class Enemy extends gameObject {
  constructor(position) {
    let spritesJugador = {
      derecha: {
        base: new ImagenDerogada("./Sprites/Player/Derecha.png"),
      },
      izquierda: {
        base: new ImagenDerogada("./Sprites/Player/Izquierda.png"),
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
  dibujar(ctx, canvasPosition) {
    if (!this.visible) return;
    if (this.alive == false) return;

    super.dibujar(ctx);
    this.vidaHUD.dibujar(ctx, canvasPosition);
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
