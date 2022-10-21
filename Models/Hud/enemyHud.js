class enemyHUD {
  constructor(name, life, color, face, lvl = null, layout = null) {
    this.name = name;
    this.life = life;
    this.maxLife = life;
    this.color = color;
    this.width = 100;
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
  drawLife(ctx, position) {
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(
      position.x + 25 - this.percentajeWidth / 2,
      position.y - 10,
      this.percentajeWidth,
      5
    );
  }
  draw(ctx, position) {
    this.drawLife(ctx, position);
    this.turnRed();
  }
  doDamage(damage) {
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
