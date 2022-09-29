class Bullet {
  constructor(posicion, orientacion, callback) {
    this.posicion = posicion;
    this.callback = callback;
    this.img = new Image();
    this.img.src = "./Sprites/Balas/Bala.png";
    this.speed = orientacion == "D" ? 10 : -10;
    this.index = new Date();
    this.lifeTime = 0; // seconds alive
    this.deathTime = 2; // death time
    console.log(this.posicion);
  }
  draw(context) {
    this.checkLife();
    this.move();
    context.drawImage(this.img, this.posicion.x, this.posicion.y, 20, 20);
  }
  move() {
    this.posicion.x += this.speed;
  }
  checkLife() {
    this.lifeTime += 60 / 1000;
    if (this.lifeTime > this.deathTime) {
      this.eliminar();
    }
  }
  eliminar() {
    this.callback.map((Bullet, index) => {
      if (Bullet.index == this.index) {
        this.indexBala = index;
      }
    });
    this.callback.splice(this.indexBala, 1);
  }
}
