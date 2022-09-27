class Character extends GameObject {
  constructor(position, size, baseUrl, life) {
    super(position, size, baseUrl);
    this.canIMove = {
      l: true,
      r: true,
    };
    this.life = life;
    this.physicsData = {
      isGravity: true,
      jumpForce: 10,
      isGround: false,
    };
    this.stateData = {
      jumping: false,
    };
    this.alive = true;
    this.orientation = "D";
  }
  move(vel) {
    this.positionWorld.x += vel;
  }
  doDamage(damage) {
    this.life -= damage;
    if (this.life < 0) {
      this.alive = false;
    }
  }
  draw(context) {
    if (!this.alive) {
      return;
    }
    super.draw(context);
  }
  salto() {
    if (this.physicsData.isGround) {
      this.velocidad.y = -this.physicsData.jumpForce;
      this.stateData.jumping = false;
      this.physicsData.isGround = false;
    }
  }
}
