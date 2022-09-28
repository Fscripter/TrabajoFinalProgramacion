class boxAmmo extends Box {
  constructor(position) {
    super(
      position,
      {
        w: 100,
        h: 50,
      },
      "./Sprites/Objects/Ammo.png"
    );
    this.maxAmmo = 50;
  }
  GiveAmmo(Target) {
    Target.increaseAmmo(this.maxAmmo);
  }
  interaction(Player) {
    super.interaction();
    this.GiveAmmo(Player);
  }
}
