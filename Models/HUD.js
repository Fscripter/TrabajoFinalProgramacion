class BarraVida {
  constructor(name, life, color, face, lvl = null) {
    this.name = name;
    this.life = life;
    this.color = color;
    this.width = 200;
    this.face = face;
    this.percentajeWidth = (life / 100) * this.width;
    this.isDamaged = false;
    this.timers = {
      actual: 0,
      maxTime: 250,
    };
    this.initialColor = color;
    this.lvl = lvl;
  }
  dibujar(ctx, position) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(position.x - this.width - 5, position.y + 25, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.drawImage(this.face, position.x - this.width - 30, position.y, 50, 50);
    ctx.fillStyle = "#000000";
    ctx.fillRect(position.x - this.width + 40, position.y, this.width + 10, 30);
    ctx.fillStyle = this.color;
    ctx.fillRect(position.x - this.width + 45, position.y + 5, this.percentajeWidth, 20);
    ctx.font = "bolder 25px Lobster";
    ctx.fillStyle = "#000000";
    if (this.lvl != null) {
      ctx.fillText(this.name + " lvl " + this.lvl, position.x - this.width + 40, position.y + 50);
    }
    ctx.fillText(this.name, position.x - this.width + 40, position.y + 50);
    ctx.closePath();
    this.turnRed();
  }
  recibirDano(damage) {
    this.life -= damage;
    this.percentajeWidth = (this.life / 100) * this.width;
    this.isDamaged = true;
  }
  turnRed() {
    if (this.isDamaged) {
      this.timers.actual += 1000 / 60;
      if (this.timers.actual > this.timers.maxTime) {
        this.isDamaged = false;
        this.timers.actual = 0;
      }
      this.color = "#ff0000";
    } else {
      this.color = this.initialColor;
    }
  }
}
