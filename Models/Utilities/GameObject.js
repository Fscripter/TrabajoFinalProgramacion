class GameObject {
  constructor(position, size, baseUrl) {
    this.positionWorld = {
      x: position.x,
      y: position.y - size.h,
    };
    this.imagen = new Image();
    this.imagen.src = "./Sprites/Player/Derecha.png";
    this.size = size;
    this.velocidad = {
      x: 0,
      y: 0,
    };
    this.saltando = false;
  }
  draw(context) {
    console.log("Dibujando pj");
    context.drawImage(
      this.imagen,
      this.positionWorld.x,
      this.positionWorld.y,
      this.size.w,
      this.size.h
    );
  }
}
