class Character extends GameObject {
  constructor(
    position,
    size,
    baseUrl,
    life,
    settingsAnimations,
    face,
    shootSettings,
    ammo = "Infinite",
    positionAmmoDelta
  ) {
    super(position, size, baseUrl);
    this.canIMove = {
      l: true,
      r: true,
    };
    this.life = life;
    this.maxLife = life;
    this.stateData = {
      jumping: false,
      moving: false,
      duck: false,
    };
    this.alive = true;
    this.active = true;
    this.orientation = "R";
    this.animation = new Animator(settingsAnimations, this.orientation);
    this.face = face;
    this.HUD = new BarraVida("Character", this.life, "#ffffff", this.face);
    this.collision = new Collision(this);
    this.bullets = [];
    this.canIshoot = true;
    this.bulletType = shootSettings.bulletType;
    this.coolDown = shootSettings.coolDown;
    this.ammo = ammo;
    this.positionAmmoDelta = positionAmmoDelta;
    console.log(this.positionAmmoDelta);
  }
  move(vel) {
    this.positionWorld.x += vel;
  }
  doDamage(damage) {
    if (this.life > 0) {
      this.life -= damage;
      this.updateLifeHUD();
      return;
    }
    this.alive = false;
    this.updateLifeHUD();
  }
  heal(life) {
    this.life += life;
    if (this.life > this.maxLife) {
      this.life = this.maxLife;
    }
    this.updateLifeHUD();
  }
  draw(context) {
    if (!this.alive) {
      return;
    }
    if (!this.active) {
      return;
    }
    this.imagen = this.animation.drawAnimation();
    super.draw(context);
    if (this instanceof Player) {
      this.updateAmmoPosition();
      context.beginPath();
      context.fillStyle = "#ff0000";
      context.arc(this.positionAmmo.normal.x, this.positionAmmo.normal.y, 10, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    }
    context.beginPath();
    context.arc(this.positionWorld.x, this.positionWorld.y, 10, 0, Math.PI * 2);
    context.fill();
    context.closePath();
    this.drawBullets(context);
    this.collision.draw(context);
  }
  jump() {
    if (this.physicsData.isGround) {
      this.velocidad.y = -this.physicsData.jumpForce;
      this.stateData.jumping = true;
      this.physicsData.isGround = false;
    }
  }
  increaseAmmo(addAmmo) {
    if (this.ammo == "Infinite") {
      return false;
    }
    this.ammo += addAmmo;
    return true;
  }
  updateLifeHUD() {
    this.HUD.updateLife(this.life);
  }
  drawBullets(context) {
    this.bullets.forEach((bullet) => {
      bullet.draw(context);
    });
  }
  updateAmmoPosition() {
    this.positionAmmo = {
      normal: {
        x: this.positionWorld.x + this.positionAmmoDelta.normal.x,
        y: this.positionWorld.y + this.positionAmmoDelta.normal.y,
      },
      down: {
        x: this.positionWorld.x + this.positionAmmoDelta.down.x,
        y: this.positionWorld.y + this.positionAmmoDelta.down.y,
      },
    };
  }
  shoot() {
    this.updateAmmoPosition();
    if (this.ammo == "Infinite") {
      this.createBullet();
      return;
    }
    if (this.ammo > 0) {
      this.createBullet();
    }
  }
  createBullet() {
    if (this.canIshoot) {
      let posicion = this.positionAmmo.normal;
      if (this.stateData.duck) {
        posicion = this.positionAmmo.down;
      }
      if (this.orientation == "D") {
        posicion.x += this.size.w;
      }
      console.log(posicion);
      console.log(this.positionAmmo);
      this.bullets.push(new this.bulletType(posicion, this.orientation, this.bullets));

      this.canIshoot = false;
      this.increaseAmmo(-1);
      this.idIntervalShoot = setTimeout(() => {
        this.canIshoot = true;
      }, this.coolDown);
    }
  }
}
