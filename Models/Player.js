class Player {
  constructor() {
    this.posicion = {
      x: 0,
      y: 0,
    };
    this.size = {
      w: 50,
      h: 100,
    };
    this.imgBase = new Image();
    this.imgBase.src = "./Sprites/Player/base.jpg";
    this.gravedadIntensidad = 10;
    this.deltaTime = 60 / 1000; // obtener el tiempo que pasa entre frame y frame
    this.isGround = false; //Variable para saber si esta tocando el suelo
    this.collision = {
      x: false,
      y: false,
    };
  }

  dibujar(ctx, mapArray) {
    ctx.drawImage(
      this.imgBase,
      this.posicion.x,
      this.posicion.y,
      this.size.w,
      this.size.h
    );
    this.aplicarGravedad(mapArray);
  }
  moverIzquierda() {
    if (this.posicion.x > 0 && this.collision.x == false) {
      this.posicion.x += -10;
    }
  }
  moverDerecha() {
    if (this.collision.x == false) {
      this.posicion.x += 10;
    }
  }
  aplicarGravedad(mapArray) {
    if (!this.isGround) {
      this.posicion.y += this.gravedadIntensidad * this.deltaTime * 10;
    }
    if (this.posicion.y > 12 * 50) {
      this.posicion.y = 0;
      this.posicion.x = 0;
    }
    this.colisionTerreno(mapArray);
  }
  colisionTerreno(mapArray) {
    this.cuadrantePosicion = {
      x: Math.floor(this.posicion.x / this.size.w),
      y: Math.ceil(this.posicion.y / 50),
    };
    if (
      mapArray[this.cuadrantePosicion.y][this.cuadrantePosicion.x] == "T" ||
      mapArray[this.cuadrantePosicion.y][this.cuadrantePosicion.x] == "L" ||
      mapArray[this.cuadrantePosicion.y][this.cuadrantePosicion.x] == "D"
    ) {
      this.isGround = true;
    } else {
      this.isGround = false;
    }

    this.collision.x = false;
    if (
      mapArray[this.cuadrantePosicion.y - 1][this.cuadrantePosicion.x + 1] ==
        "T" ||
      mapArray[this.cuadrantePosicion.y - 1][this.cuadrantePosicion.x + 1] ==
        "L" ||
      mapArray[this.cuadrantePosicion.y - 1][this.cuadrantePosicion.x + 1] ==
        "D" ||
      mapArray[this.cuadrantePosicion.y - 1][this.cuadrantePosicion.x] == "S"
    ) {
      this.collision.x = true;
    }
    console.log(this.collision.x);
  }
}
