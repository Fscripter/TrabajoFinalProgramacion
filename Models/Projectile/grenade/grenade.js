class Grenade extends Projectile {
  constructor(position, orientation) {
    super(position, orientation, {
      w: 30,
      h: 30,
    });
    this.fuerza = {
      x: 5,
      y: 20,
    };
    this.speed = this.fuerza.x;
    this.image = new ImagenDerogada("./Sprites/Balas/Grenade.png");
  }
  mover() {
    this.positionWorld.x += this.speed;
    this.reducirFuerza();
  }
  reducirFuerza() {
    //Reducir fuerza en x, y aplicar gravedad
    this.speed -= 60 / 1000;
    if (this.speed < 0) {
      this.speed = 0;
    }
  }
  draw(context) {
    this.mover();
    super.draw(context);
  }
}
