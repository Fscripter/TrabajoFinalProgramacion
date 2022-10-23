class ObjectsMap {
  constructor(position, size, imgUrl) {
    this.positionWorld = position;
    this.size = size;
    this.imagen = new ImagenDerogada(imgUrl);
  }
  draw(context) {
    console.log(this);
    context.drawImage(
      this.imagen,
      this.positionWorld.x,
      this.positionWorld.y,
      this.size.w,
      this.size.h
    );
  }
}
