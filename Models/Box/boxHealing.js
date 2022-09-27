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
    this.Healing = 60;
  }
  Healing(Target) {
    Target.life += this.Healing;
  }
  interaction(Player, enemysArray) {
    super.interaction();
    this.Healing(Player);
  }
}
