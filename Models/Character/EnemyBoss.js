class EnemyBoss extends Enemy {
  constructor(position, id, padreArr) {
    super(position, id, padreArr);
  }
  IA(
    playerData = {
      positionWorld: {
        x: Number,
        y: Number,
      },
      life: Number,
      ammount: Number,
    },
    bulletsArray
  ) {
    if (Math.abs(playerData.positionWorld.x - this.positionWorld.x) < 200) {
      this.jump();
      console.log(this);
    }
  }
}
