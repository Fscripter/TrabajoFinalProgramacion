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
    positionAmmoDelta = {
      normal: {
        x: 0,
        y: 35,
      },
      down: {
        x: 0,
        y: 58,
      },
    }
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

    this.face = face;
    this.HUD = new BarraVida(
      "Character",
      this.life,
      "#ffffff",
      this.face,
      null,
      new ImagenDerogada("./Sprites/Player/Layout.png")
    );
    this.bullets = [];
    this.canIshoot = true;
    this.bulletType = shootSettings.bulletType;
    this.coolDown = shootSettings.coolDown;
    this.ammo = ammo;
    this.positionAmmoDelta = positionAmmoDelta;
    this.collider = new Collision(this);
    this.destroyBullet = this.destroyBullet.bind(this);
    this.dev = true;
    this.Animator = new AnimatorEngine(settingsAnimations, this.size);
  }
  move(vel) {
    this.positionWorld.x += vel;
  }
  doDamage(damage, callback = () => {}) {
    if (this.life - damage > 0) {
      this.life -= damage;
      this.updateLifeHUD();
      return;
    }
    this.alive = false;
    this.life = 0;
    callback();
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
    this.imagen = this.Animator.drawAnimation();
    context.drawImage(this.imagen, this.positionWorld.x, this.positionWorld.y);
    this.drawBullets(context);
    if (this.dev) {
      this.collider.draw(context);
    }
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
  getUp() {
    this.stateData.duck = false;
    this.collider.changeState("Estatico");
  }
  getDown() {
    if (this.stateData.moving == true) {
      this.getUp();
      return;
    }
    this.stateData.duck = true;
    this.collider.changeState("Down");
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
      this.updateAmmoPosition();
      let posicion = this.positionAmmo.normal;
      if (this.stateData.duck) {
        posicion = this.positionAmmo.down;
      }
      if (this.orientation == "R") {
        posicion.x += this.size.w;
      }
      let Bala = new this.bulletType(posicion, this.orientation);
      Bala.addCallback(this.destroyBullet);
      this.bullets.push(Bala);
      this.canIshoot = false;
      this.increaseAmmo(-1);
      this.idIntervalShoot = setTimeout(() => {
        this.canIshoot = true;
      }, this.coolDown);
    }
  }
  destroyBullet(id) {
    this.bullets.forEach((bullet, index) => {
      if (bullet.id == id) {
        this.bullets.splice(index, 1);
      }
    });
  }
}
