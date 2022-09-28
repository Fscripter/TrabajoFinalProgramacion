class BoxHealing extends Box {
  constructor(position) {
    super(
      position,
      {
        w: 100,
        h: 50,
      },
      "./Sprites/Objects/Healing.png"
    );
    this.lifeRestore = 60;
  }
  Healing(Target) {
    Target.heal(this.lifeRestore);
  }
  interaction(Player, enemysArray) {
    super.interaction();
    this.Healing(Player);
  }
}
