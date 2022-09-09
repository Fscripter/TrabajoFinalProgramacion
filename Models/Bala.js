class Bala {
  constructor(x, y, orientacion, callback, width) {
    this.posicion = {
      x,
      y,
    };
    this.orientacion = orientacion;
    this.timer = setTimeout(() => {
      callback.shift();
    }, 750);
    this.callback = callback;
    this.img = new Image();
    this.img.src = "./Sprites/Balas/Bala.png";
    this.width = width;
  }
  dibujar(context) {
    if (this.orientacion == "D") {
      context.drawImage(this.img, this.posicion.x + this.width, this.posicion.y, 20, 20);
      return;
    }
    context.drawImage(this.img, this.posicion.x, this.posicion.y, 20, 20);
  }
  move() {
    if (this.orientacion == "D") {
      this.posicion.x += 10;
      return;
    }
    this.posicion.x -= 10;
  }
  eliminar() {
    this.callback.shift();
    clearTimeout(this.timer);
  }
}
