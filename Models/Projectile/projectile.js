class Projectile {
  constructor(position, orientation, size, damage) {
    this.positionWorld = position;
    this.orientation = orientation;
    this.size = size;
    this.damage = damage;
    this.image = new ImagenDerogada("./Sprites/Objects/Cajas1.jpeg");
  }
  draw(context) {
    context.drawImage(
      this.image,
      this.positionWorld.x,
      this.positionWorld.y,
      this.size.w,
      this.size.h
    );
  }
}
