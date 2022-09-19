function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
class Vida {
  // left l, right r
  constructor(name, life) {
    this.name = name;
    this.life = life;
    this.width = 200;
    this.percentajeWidth = (life / 100) * this.width;
    this.color = "#ffffff";
  }
  dibujar(ctx, position) {
    ctx.fillRect(position.x - this.width - 30, position.y, this.width + 10, 30);
    ctx.fillStyle = this.color;
    ctx.fillRect(position.x - this.width - 25, position.y + 5, this.percentajeWidth, 20);
    ctx.font = "bold 20px arial";
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText(this.name, position.x - this.width - 30, position.y + 55);
    ctx.fillStyle = "#000000";
    ctx.fillText(this.name, position.x - this.width - 30, position.y + 55);
  }
  recibirDano(damage) {
    this.life -= damage;
    this.percentajeWidth = (this.life / 100) * this.width;
  }
}
class VidaEnemigo extends Vida {
  constructor(name, life, baseColor) {
    super(name, life);
    this.color = baseColor;
  }
  dibujar(ctx, position) {
    ctx.fillRect(position.x - this.width - 30, position.y, this.width + 10, 30);
    ctx.fillStyle = this.color;
    ctx.fillRect(position.x - this.width - 25, position.y + 5, this.percentajeWidth, 20);
    ctx.font = "bold 20px arial";
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText(this.name, position.x - this.width - 30, position.y + 55);
    ctx.fillStyle = "#000000";
    ctx.fillText(this.name, position.x - this.width - 30, position.y + 55);
  }
  calculate() {
    let valorRojo = Math.floor((100 - this.percentajeWidth / 2) * (255 / 100));
    let valorAzul = Math.floor((this.percentajeWidth / 2) * (255 / 100));
    this.color = rgbToHex(valorRojo, 0, valorAzul);
  }
  recibirDano(damage) {
    super.recibirDano(damage);
    this.calculate();
  }
}
class VidaJugador extends Vida {
  constructor(name, life) {
    super(name, life);
    this.color = "#00ff00";
  }
  dibujar(ctx, canvasPosition) {
    ctx.fillRect(-canvasPosition.x + 15, -canvasPosition.y + 15, this.width + 10, 30);
    ctx.fillStyle = this.color;
    ctx.fillRect(-canvasPosition.x + 20, -canvasPosition.y + 20, this.percentajeWidth, 20);
    ctx.font = "bold 20px arial";
    ctx.strokeStyle = "#ffffff";
    ctx.strokeText(this.name, -canvasPosition.x + 15, -canvasPosition.y + 70);
    ctx.fillStyle = "#000000";
    ctx.fillText(this.name, -canvasPosition.x + 15, -canvasPosition.y + 70);
  }
  calculate() {
    let valorRojo = Math.floor((100 - this.percentajeWidth / 2) * (255 / 100));
    let valorVerde = Math.floor((this.percentajeWidth / 2) * (255 / 100));
    console.log(valorRojo, valorVerde);
    this.color = rgbToHex(valorRojo, valorVerde, 0);
  }
  recibirDano(damage) {
    super.recibirDano(damage);
    this.calculate();
  }
}
