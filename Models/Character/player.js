class Player extends Character {
  constructor(position) {
    super(position, { w: 50, h: 100 }, "./Sprites/Player/Derecha.png", 100);
  }
  move(vel, mapaMovement) {
    if (this.canIMove.l || this.canIMove.r) {
      super.move(vel);
      mapaMovement.mapaCanvas.canvasPosition.x -= vel;
    }
  }
}
