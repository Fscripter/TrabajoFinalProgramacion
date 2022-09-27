class gameObject {
  constructor(position, imagenBase = new Image()) {
    this.size = {
      w: imagenBase.width,
      h: imagenBase.height,
    };
    this.positionWorld = {
      x: position.x,
      y: position.y - this.size.h,
    };
    this.imagenBase = imagenBase;
  }
  draw(context) {
    context.drawImage(this.imagenBase, this.positionWorld.x, this.positionWorld.y);
  }
}
