class BarraVida {
  constructor(name, life, color, face, lvl = null, layout = null) {
    this.name = name;
    this.life = life;
    this.maxLife = life;
    this.color = color;
    this.width = 205;
    this.face = face;
    this.updateLife(life);
    this.isDamaged = false;
    this.timers = {
      actual: 0,
      maxTime: 250,
    };
    this.initialColor = color;
    this.lvl = lvl;
    this.layout = layout;
    this.hpImg = new ImagenDerogada("./Sprites/Menu/UI/hp.png");
  }
  updateLife(life) {
    this.life = life;
    this.percentajeWidth = (life / this.maxLife) * this.width;
    // life -> 100 -> 250
    // anyChange -> calc -> width
  }
  drawLayout(ctx, position) {
    ctx.drawImage(this.layout, position.x - this.width - 15, position.y, 275, 75);
  }
  drawFace(ctx, position) {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(position.x - this.width + 22, position.y + 37, 28, 0, Math.PI * 2);
    ctx.fill();
    ctx.closePath();
    ctx.beginPath();
    ctx.drawImage(this.face, position.x - this.width, position.y + 15, 45, 45);
  }
  drawLife(ctx, position) {
    ctx.drawImage(
      this.hpImg,
      position.x - this.width + 50,
      position.y + 15,
      this.percentajeWidth,
      25
    );
  }
  drawText(ctx, position) {
    ctx.font = "bolder 23px Lobster";
    ctx.fillStyle = "#FFFFFF";
    if (this.lvl != null) {
      ctx.fillText(this.name + " lvl " + this.lvl, position.x - this.width + 40, position.y + 50);
    }
    ctx.fillText(this.name, position.x - this.width + 65, position.y + 55);
    ctx.closePath();
  }
  draw(ctx, position) {
    this.drawLife(ctx, position);
    this.drawFace(ctx, position);
    this.drawLayout(ctx, position);
    this.drawText(ctx, position);
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
