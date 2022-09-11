class Vida {
  // left l, right r
  constructor(name, life, leftOrRight = "l") {
    this.name = name;
    this.life = life;
    this.width = 200;
    this.percentajeWidth = (life / 100) * this.width;
    this.posicionIzquierdaODerecha = leftOrRight;
  }
  dibujar(ctx, canvasPosition) {
    if (this.posicionIzquierdaODerecha == "l") {
      ctx.fillRect(-canvasPosition.x + 15, -canvasPosition.y + 15, this.width + 10, 30);
      ctx.fillStyle = "#ff0000";
      ctx.fill();
      ctx.fillRect(-canvasPosition.x + 20, -canvasPosition.y + 20, this.percentajeWidth, 20);
      ctx.fillStyle = "#ff0000";
      ctx.fill();
      ctx.font = "bold 20px arial";
      ctx.strokeStyle = "#ffffff";
      ctx.strokeText(this.name, -canvasPosition.x + 15, -canvasPosition.y + 70);
      ctx.fillStyle = "#000000";
      ctx.fillText(this.name, -canvasPosition.x + 15, -canvasPosition.y + 70);
    }
  }
  dibujarNormal(ctx, position) {
    ctx.fillRect(position.x - this.width - 30, position.y, this.width + 10, 30);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
    ctx.fillRect(position.x - this.width - 25, position.y + 5, this.percentajeWidth, 20);
    ctx.fillStyle = "#ff0000";
    ctx.fill();
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
