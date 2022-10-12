class BoxHealing extends Box {
  constructor(
    position,
    size = {
      w: 50,
      h: 50,
    },
    sprite = "./Sprites/Objects/Caja/BoxHealing/Healing.png"
  ) {
    super(position, size, sprite);
    this.lifeRestore = 50;
    this.sound = new Audio("./Sprites/Objects/Healing.mp3");
  }
  Healing(Target) {
    Target.heal(this.lifeRestore);
  }
  interaction(Player) {
    super.interaction();
    this.Healing(Player);
    this.sound.play();
  }
}
