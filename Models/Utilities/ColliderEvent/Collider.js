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
  collisionNormalBox(box) {
    if (
      this.player.positionWorld.x >= box.positionWorld.x &&
      this.player.positionWorld.x < box.positionWorld.x + box.size.w
    ) {
      box.interaction(this.player);
    }
  }
  collisionBoxEntities() {
    this.boxes.forEach((box) => {
      if (!box.active) {
        return;
      }
      //Colision balas - TNT -> mandar player y enemigos

      //Colision jugador - Heal/Ammo
      if (box instanceof BoxHealing || box instanceof boxAmmo) {
        this.collisionNormalBox(box);
        return;
      }
    });
  }
}
