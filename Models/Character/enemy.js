class Enemy extends Character {
  constructor(position, id, padreArr) {
    super(
      position,
      { w: 50, h: 50 },
      "./Sprites/Player/Derecha.png",
      100,
      {
        states: ["Default", "Caminar", "Saltar", "Caer"],
        tileWidth: 32,
        animations: {
          Default: {
            transitionTime: 100,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Enemys/Fantasma/Fantasma.png"),
              l: new ImagenDerogada("./Sprites/Enemys/Candileja/Candileja.png"),
            },
          },
          Caminar: {
            transitionTime: 200,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
              l: new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
            },
          },
          Saltar: {
            transitionTime: 1000,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
              l: new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
            },
          },
          Caer: {
            transitionTime: 0,
            spriteSheet: {
              r: new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
              l: new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
            },
          },
        },
      },
      new ImagenDerogada("./Sprites/Enemys/Antioquia/Face.png"),
      {
        bulletType: Bullet,
        coolDown: 1500,
      }
    );
    this.type = "Enemy";
    this.id = id;
    this.father = padreArr;
    this.HUD = new enemyHUD("Enemigo", this.maxLife, "red", this.face, null, null);
  }
  delete() {
    this.father.enemys.map((enemy, index) => {
      if (enemy.id == this.id) {
        this.lastID = this.id;
        this.id = index;
      }
    });
    this.father.enemys.splice(this.id, 1);
    console.log(this);
    return this.lastID;
  }
  doDamage(damage, callback = () => {}) {
    if (this.life - damage > 0) {
      this.life -= damage;
      this.HUD.doDamage(damage);
      return;
    }
    this.alive = false;
    this.life = 0;
    callback();
    this.updateLifeHUD();
  }
  move(vel) {
    if (this.canIMove.l || this.canIMove.r) {
      super.move(vel);
      this.orientation = "L";
      if (vel > 0) {
        this.orientation = "R";
      }
      this.Animator.changeOrientation(this.orientation);
    }
  }
  draw(context) {
    this.changeState();
    this.HUD.draw(context, this.positionWorld);
    super.draw(context);
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
    this.Animator.changeState("Default");
  }
  AI(player, bulletsArray) {
    let distanceX = Math.abs(this.positionWorld.x - player.positionWorld.x);
    let isRight = this.positionWorld.x < player.positionWorld.x;
    let isUp = this.positionWorld.y > player.positionWorld.y;
    let fallingDown = !this.stateData.jumping && !this.physicsData.isGround;
    let quadrant = 0;
    if (isRight && distanceX < 400) {
      this.shoot();
      this.orientation = "R";
      this.Animator.changeOrientation("R");
    }
    if (!isRight && distanceX < 400) {
      this.Animator.changeOrientation("L");
      this.orientation = "L";
      this.shoot();
    }
    if (isRight && isUp && this.canIshoot == true) {
      this.jump();
      this.shoot();
    }
    if (!isRight && isUp && this.canIshoot == true) {
      this.jump();
      this.shoot();
    }
    bulletsArray.forEach((bullet = Bullet) => {
      let distanceBullet = Math.abs(bullet.positionWorld.x - this.positionWorld.x);
      if (
        bullet.positionWorld.y >= this.positionWorld.y &&
        bullet.positionWorld.y <= this.positionWorld.y + this.size.h + 1 / 2 + 5 &&
        !this.stateData.jumping &&
        distanceBullet < 100 + bullet.size.w &&
        bullet.positionWorld.y > this.positionWorld.y - (1 / 3) * this.size.h
      ) {
        this.getDown();
      }
      if (
        bullet.orientation == "R" &&
        bullet.positionWorld.x > this.positionWorld.x &&
        distanceBullet < 10
      ) {
        this.getUp();
      }
      if (fallingDown == true && distanceBullet < bullet.size.w + 20 && bullet.orientation == "R") {
        this.move(-2);
      }
      if (fallingDown == true && distanceBullet < bullet.size.w + 20 && bullet.orientation == "L") {
        this.move(2);
      }
      if (
        bullet.positionWorld.y < this.positionWorld.y &&
        bullet.positionWorld.y > this.positionWorld.y - this.size.h &&
        distanceBullet < 100
      ) {
        quadrant = "IV";
      }
      if (
        bullet.positionWorld.y > this.positionWorld.y &&
        bullet.positionWorld.y < this.positionWorld.y + this.size.h / 2 &&
        distanceBullet < 100
      ) {
        quadrant = "III";
      }
      if (
        bullet.positionWorld.y > this.positionWorld.y + this.size.h / 2 &&
        bullet.positionWorld.y < this.positionWorld.y + this.size.h &&
        distanceBullet < 100
      ) {
        quadrant = "II";
      }
      if (
        bullet.positionWorld.y > this.positionWorld.y + this.size.h &&
        bullet.positionWorld.y < this.positionWorld.y + this.size.h * 2
      ) {
        quadrant = "I";
      }
      if ((quadrant = "II") && distanceBullet < 100 + bullet.size.w) {
        this.jump();
      }
      if ((quadrant = "III")) {
        this.getDown();
      }

      // console.log(quadrant);
    });
  }
}
