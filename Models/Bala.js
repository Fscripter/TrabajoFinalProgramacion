class Bala {
  constructor(x, y, right = true, callback) {
    this.position = {
      x,
      y,
    };
    this.right = right;
    setTimeout(() => {
      callback.shift();
    }, 1750);
    this.img = new Image();
    this.img.src = "./Sprites/Balas/Bala.png";
  }
  dibujar(context) {
    context.drawImage(this.img, this.position.x, this.position.y + 25, 20, 20);
  }
  move() {
    if (this.right) {
      this.position.x += 10;
      return;
    }
    this.position.x -= 10;
  }
}
