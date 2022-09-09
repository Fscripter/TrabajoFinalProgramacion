class Bala {
  constructor(x, y, right = true, callback) {
    this.posicion = {
      x,
      y,
    };
    this.right = right;
    this.timer = setTimeout(() => {
      callback.shift();
    }, 750);
    this.callback = callback;
    this.img = new Image();
    this.img.src = "./Sprites/Balas/Bala.png";
  }
  dibujar(context) {
    context.drawImage(this.img, this.posicion.x, this.posicion.y, 20, 20);
  }
  move() {
    if (this.right) {
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
