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
    this.maxAmmo = 100;
  }
  GiveAmmo(Target) {
    Target.Ammo += 50;
  }
  interaction(Player, Ammo) {
    super.interaction();
    this.GiveAmmo(Player);
  }
}
