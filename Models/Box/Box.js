class Box extends GameObject {
  constructor(position, size, baseUrl) {
    super(position, size, baseUrl);
    this.active = true;
  }
  interaction() {
    this.active = false;
    console.log(
      `Caja con id: ${
        this.positionWorld.x + "" + this.positionWorld.y
      } ha interactuado y desaparecido`
    );
  }
  draw(context) {
    if (!this.active) {
      return;
    }
    super.draw(context);
  }
}
