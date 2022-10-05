class Collider {
  constructor() {
    console.log("Colision engine started");
  }
  collision() {
    this.collisionBoxEntities();
    this.getCollisionBullets();
  }
  getEntities(boxArray, enemysArray) {
    this.boxes = boxArray;
    this.enemysArray = enemysArray;
  }
  getPlayer(player) {
    this.player = player;
  }
  VerifyPoint(Point, objectB) {
    let isInX =
      Point.x >= objectB.positionWorld.x && Point.x < objectB.positionWorld.x + objectB.size.w;
    let isInY =
      Point.y >= objectB.positionWorld.y && Point.y < objectB.positionWorld.y + objectB.size.h;

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
      box.interaction(this.player, this.enemysArray);
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
      this.boxes.forEach((box) => {
        if (box instanceof TNT) {
          this.getCollisionTNT(bullet, box);
        }
      });
      //Colision balas enemigos
      this.enemysArray.forEach((enemy) => {
        this.getCollisionEnemy(bullet, enemy);
      });
    });
  }
  collisionBoxEntities() {
    this.boxes.forEach((box) => {
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
