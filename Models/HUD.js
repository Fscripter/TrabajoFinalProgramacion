class BarraVida {
  constructor(name, life, color) {
    this.name = name;
    this.life = life;
    this.color = color;
    this.width = 200;
    this.percentajeWidth = (life / 100) * this.width;
  }
  dibujar(ctx, position) {
    ctx.fillRect(position.x - this.width - 30, position.y, this.width + 10, 30);
    ctx.fillStyle = this.color;
    ctx.fillRect(position.x - this.width - 25, position.y + 5, this.percentajeWidth, 20);
    ctx.font = "italic 1000 25px Lobster";
    ctx.fillStyle = "#000000";
    ctx.fillText(this.name, position.x - this.width - 30, position.y + 55);
  }
  recibirDano(damage) {
    this.life -= damage;
    this.percentajeWidth = (this.life / 100) * this.width;
  }
}
