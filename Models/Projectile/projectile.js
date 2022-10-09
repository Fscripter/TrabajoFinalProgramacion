class Projectile {
  constructor(position, orientacion, size, imageUrl) {
    this.positionWorld = position;
    this.orientacion = orientacion;
    this.size = size;
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
