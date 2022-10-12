class BoxHealing extends Box {
  constructor(position) {
    super(
      position,
      {
        w: 50,
        h: 50,
      },
      "./Sprites/Objects/Caja/BoxHealing/Healing.png"
    );
    this.lifeRestore = 50;
    this.sound = new Audio("./Sprites/Objects/Healing.mp3");
  }
  Healing(Target) {
    Target.heal(this.lifeRestore);
  }
  interaction(Player, enemysArray) {
    super.interaction();
    this.Healing(Player);
    this.sound.play();
  }
}
