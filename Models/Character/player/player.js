class Player extends Character {
  constructor(position) {
    super(
      position,
      { w: 50, h: 50 },
      "./Sprites/Player/Derecha.png",
      200,
      {
        states: ["Default", "Caminar", "Saltar", "Caer", "Agachar"],
        tileWidth: 32,
        animations: {
          Default: {
            transitionTime: 200,
            loop: true,
            spriteSheet: {
              l: new ImagenDerogada("./Sprites/Enemys/Pirata/Estatico/Pirata-Idle-L.png"),
              r: new ImagenDerogada("./Sprites/Enemys/Pirata/Estatico/Pirata-Idle.png"),
            },
          },
          Caminar: {
            transitionTime: 200,
            loop: true,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Enemys/Pirata/Caminar/Pirata-Moving.png"),
              l: new ImagenDerogada("./Sprites/Enemys/Pirata/Caminar/Pirata-Moving-L.png"),
            },
          },
          Saltar: {
            transitionTime: 0,
            loop: false,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose1.png"),
              l: new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose1.png"),
            },
          },
          Caer: {
            transitionTime: 0,
            loop: false,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose6.png"),
              l: new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose6.png"),
            },
          },
          Agachar: {
            transitionTime: 30,
            loop: false,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Player/Agachar/Derecha/Paso1.png"),
              l: new ImagenDerogada("./Sprites/Player/Agachar/Izquierda/Paso1.png"),
            },
          },
        },
      },
      new ImagenDerogada("./Sprites/Player/Face.png"),
      {
        bulletType: Bullet,
        coolDown: 250,
      },
      50,
      {
        normal: {
          x: 0,
          y: 35,
        },
        down: {
          x: 0,
          y: 58,
        },
      }
    );
    this.weapons = new weaponHud();
    this.updateAmmo();
  }
  doDamage(damage) {
    if (this.life - damage > 0) {
      this.life -= damage;
      this.updateLifeHUD();
      return;
    }
    this.alive = false;
    this.life = 0;
    this.updateLifeHUD();
  }
  updateAmmo() {
    this.ammo = this.weapons.currentAmmo;
    this.coolDown = this.weapons.currentCooldown;
  }
  changeWeapon(type) {
    this.weapons.changeWeapon(type);
    if (type == 1) {
      this.bulletType = Bullet;
      return;
    }
    if (type == 2) {
      this.bulletType = Laser;
      return;
    }
    if (type == 3) {
      this.bulletType = Grenade;
      return;
    }
    this.bulletType = Flamethrower;
  }
  drawBullets(context) {
    this.updateAmmoPosition();
    let posicion = this.positionAmmo.normal;
    if (this.stateData.duck) {
      posicion = this.positionAmmo.down;
    }
    if (this.orientation == "R") {
      posicion.x += this.size.w;
    } else {
      posicion.x -= this.size.w * 2;
    }
    this.bullets.forEach((bullet) => {
      if (bullet instanceof Flamethrower) {
        bullet.update(posicion, this.orientation);
      }
      bullet.draw(context);
    });
  }
  move(vel, mapaMovement) {
    if (this.canIMove.l || this.canIMove.r) {
      super.move(vel);
      this.orientation = "L";
      if (vel > 0) {
        this.orientation = "R";
      }
      this.Animator.changeOrientation(this.orientation);
      mapaMovement.mapaCanvas.canvasPosition.x -= vel;
    }
  }
  jump() {
    super.jump();
  }
  draw(context) {
    this.changeState();
    super.draw(context);
    // if (!this.alive) {
    //   return;
    // }
    // if (!this.active) {
    //   return;
    // }
    // this.imagen = this.Animator.drawAnimation();
    // context.drawImage(this.imagen, this.positionWorld.x, this.positionWorld.y);
    this.drawBullets(context);
    if (this.dev) {
      this.collider.draw(context);
    }
    this.HUD.draw(context, {
      x: this.positionWorld.x - 250,
      y: this.positionWorld.y - 270,
    });
    this.weapons.draw(context, {
      x: this.positionWorld.x - 250,
      y: this.positionWorld.y - 270,
    });
  }
  changeState() {
    //Each one, defines own rules for animations
    if (this.stateData.jumping == false && !this.physicsData.isGround) {
      this.Animator.changeState("Caer");
      return;
    }
    if (this.stateData.jumping == true && !this.physicsData.isGround) {
      this.Animator.changeState("Saltar");
      return;
    }
    if (this.physicsData.isGround && this.stateData.moving) {
      this.Animator.changeState("Caminar");
      return;
    }
    if (this.physicsData.isGround && this.stateData.duck) {
      this.Animator.changeState("Agachar");
      return;
    }
    this.Animator.changeState("Default");
    return;
  }
  shoot() {
    this.updateAmmo();
    if (this.ammo > 0) {
      super.shoot();
    }
  }
  increaseAmmo() {
    this.weapons.decreaseAmmount();
  }
  randomAudio() {
    let audioNumber = (Math.random() * (3 - 1) + 1).toFixed(0);
    let damageSound = new Audio();
    damageSound.src = `./Sprites/Player/Sound/Damage/${audioNumber}.mp3`;
    return damageSound;
  }
  doDamage(damage) {
    this.randomAudio().play();
    super.doDamage(damage);
  }
}
