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
    this.bullets = [];
    this.canIshoot = true;
    this.bulletType = shootSettings.bulletType;
    this.coolDown = shootSettings.coolDown;
    this.ammo = ammo;
    this.positionAmmoDelta = positionAmmoDelta;
  }
  move(vel) {
    this.positionWorld.x += vel;
  }
  doDamage(damage) {
    this.life -= damage;
    if (this.life < 0) {
      this.alive = false;
    }
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
    this.drawBullets(context);
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
      this.createBullet(this.orientation, this.coolDown);
      return;
    }
    if (this.ammo > 0) {
      this.createBullet(this.orientation, this.coolDown);
    }
  }
  createBullet(orientacion = "D") {
    if (this.canIshoot) {
      if (orientacion == "D") {
        posicion.x += this.size.w;
      }

      if (this.stateData.duck) {
        this.bullets.push(
          new this.bulletType(this.positionAmmo.down, this.orientation, this.bullets)
        );
      } else {
        this.bullets.push(
          new this.bulletType(this.positionAmmo.normal, this.orientation, this.bullets)
        );
      }

      this.canIshoot = false;
      this.increaseAmmo(-1);
      this.idIntervalShoot = setTimeout(() => {
        this.canIshoot = true;
      }, this.coolDown);
    }
  }
}
