class Collider {
  constructor(engine) {
    this.boxes = [];
    this.enemys = [];
    this.engine = engine;
    this.engine.score.increaseScore = this.engine.score.increaseScore.bind(engine.score);
  }
  addBox(boxArr) {
    this.boxes = this.boxes.concat(boxArr);
  }
  addEnemy(enemyArr) {
    this.enemys = this.enemys.concat(enemyArr);
  }
  collision() {
    this.collisionBoxEntities();
    this.getCollisionBullets();
    this.collisionBulletsEnemy();
  }
  getPlayer(player) {
    this.player = player;
    console.log("Player added to Collision! ✔");
  }
  VerifyPoint(Point, objectB = new Character()) {
    let isInX =
      Point.x >= objectB.collider.measure.x &&
      Point.x < objectB.collider.measure.x + objectB.collider.measure.w;
    let isInY =
      Point.y >= objectB.collider.measure.y &&
      Point.y < objectB.collider.measure.y + objectB.collider.measure.h;

    return isInX && isInY;
  }
  VerifyObjects(objectA, objectB) {
    let isIn =
      this.VerifyPoint(
        {
          x: objectA.collider.measure.x,
          y: objectA.collider.measure.y,
        },
        objectB
      ) ||
      this.VerifyPoint(
        {
          x: objectA.collider.measure.x + objectA.collider.measure.w,
          y: objectA.collider.measure.y,
        },
        objectB
      ) ||
      this.VerifyPoint(
        {
          x: objectA.collider.measure.x + objectA.collider.measure.w,
          y: objectA.collider.measure.y + objectA.collider.measure.h,
        },
        objectB
      ) ||
      this.VerifyPoint(
        {
          x: objectA.collider.measure.x,
          y: objectA.collider.measure.y + objectA.size.h,
        },
        objectB
      );
    return isIn;
  }
  getCollisionBetween(objectA, objectB) {
    return this.VerifyObjects(objectA, objectB);
  }
  getCollisionTNT(bullet, box) {
    let isIn = this.getCollisionBetween(bullet, box);

    if (isIn && !box.isblow) {
      box.interaction(this.player, this.enemys, this.engine.score.increaseScore);
      bullet.delete();
    }
  }
  getCollisionEnemy(bullet, enemy) {
    let isIn = this.getCollisionBetween(bullet, enemy);
    if (isIn && enemy.alive) {
      enemy.doDamage(bullet.damage, this.engine.score.increaseScore);
      bullet.delete();
    }
  }
  collisionNormalBox(box) {
    let isInX =
      this.player.positionWorld.x >= box.positionWorld.x &&
      this.player.positionWorld.x < box.positionWorld.x + box.size.w;
    let isInY =
      this.player.positionWorld.y >= box.positionWorld.y - 50 &&
      this.player.positionWorld.y < box.positionWorld.y + box.size.h;
    if (isInX && isInY) {
      box.interaction(this.player);
    }
  }
  getCollisionBullets() {
    this.player.bullets.forEach((bullet) => {
      if (bullet instanceof Grenade) {
        if (bullet.readyToBlow == true && bullet.isBlow == false) {
          bullet.blow(this.player, this.enemys);
          return;
        }
        this.enemys.forEach((enemy) => {
          let isIn = this.getCollisionBetween(bullet, enemy);
          if (isIn && enemy.alive) {
            bullet.blow(this.player, [enemy]);
          }
        });
        return;
      }
      //Colision balas TNT
      this.boxes.forEach((box) => {
        if (box instanceof TNT) {
          this.getCollisionTNT(bullet, box);
        }
      });
      //Colision balas enemigos
      this.enemys.forEach((enemy) => {
        this.getCollisionEnemy(bullet, enemy);
      });
    });
  }
  collisionBulletsEnemy() {
    this.enemys.forEach((enemy) => {
      enemy.bullets.forEach((bullet) => {
        this.getCollisionEnemy(bullet, this.player);
      });
    });
  }
  collisionBoxEntities() {
    this.boxes.forEach((box) => {
      if (!box.active) {
        return;
      }
      //Colision jugador - Heal/Ammo
      if (!(box instanceof TNT)) {
        this.collisionNormalBox(box);
        return;
      }
    });
  }
}
