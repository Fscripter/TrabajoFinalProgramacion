class Collider {
  constructor() {}
  addObjects(box, enemy) {
    this.boxes = box;
    this.enemys = enemy;
    console.log("Objects added to Collision! ✔");
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
          x: objectA.positionWorld.x,
          y: objectA.positionWorld.y,
        },
        objectB
      ) ||
      this.VerifyPoint(
        {
          x: objectA.positionWorld.x - objectA.size.w,
          y: objectA.positionWorld.y,
        },
        objectB
      ) ||
      this.VerifyPoint(
        {
          x: objectA.positionWorld.x - objectA.size.w,
          y: objectA.positionWorld.y + objectA.size.h,
        },
        objectB
      ) ||
      this.VerifyPoint(
        {
          x: objectA.positionWorld.x,
          y: objectA.positionWorld.y + objectA.size.h,
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
      box.interaction(this.player, this.enemys.enemys);
      bullet.delete();
    }
  }
  getCollisionEnemy(bullet, enemy) {
    let isIn = this.getCollisionBetween(bullet, enemy);
    if (isIn && enemy.alive) {
      enemy.doDamage(10);
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
      //Colision balas TNT
      this.boxes.boxes.forEach((box) => {
        if (box instanceof TNT) {
          this.getCollisionTNT(bullet, box);
        }
      });
      //Colision balas enemigos
      this.enemys.enemys.forEach((enemy) => {
        this.getCollisionEnemy(bullet, enemy);
      });
    });
  }
  collisionBulletsEnemy() {
    this.enemys.enemys.forEach((enemy) => {
      enemy.bullets.forEach((bullet) => {
        this.getCollisionEnemy(bullet, this.player);
      });
    });
  }
  collisionBoxEntities() {
    this.boxes.boxes.forEach((box) => {
      if (!box.active) {
        return;
      }
      //Colision jugador - Heal/Ammo
      if (box instanceof BoxHealing || box instanceof boxAmmo) {
        this.collisionNormalBox(box);
        return;
      }
    });
  }
}
