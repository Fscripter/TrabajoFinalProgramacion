class Collider {
  constructor() {
    console.log("Colision engine started");
  }
  collision() {
    this.collisionBoxEntities();
  }
  getEntities(boxArray, enemysArray) {
    this.boxes = boxArray;
    this.enemysArray = enemysArray;
  }
  getPlayer(player) {
    this.player = player;
  }
  getCollisionBulletTNT(bullet, box) {
    let isInX =
      bullet.positionWorld.x >= box.positionWorld.x &&
      bullet.positionWorld.x < box.positionWorld.x + box.size.w;
    let isInY =
      bullet.positionWorld.y >= box.positionWorld.y - 50 &&
      bullet.positionWorld.y < box.positionWorld.y + box.size.h;
    if (isInX && isInY) {
      console.log("Explote esa mierda");
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
      //Colision balas - TNT -> mandar player y enemigos
      this.player.bullets.forEach((bullet) => {
        this.getCollisionBulletTNT(bullet, box);
      });
    });
  }
}
