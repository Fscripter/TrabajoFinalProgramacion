class Boxflamethrower extends Box {
  constructor(position) {
    super(
      position,
      {
        w: 100,
        h: 50,
      },
      "./Sprites/Objects/Caja/BoxFlamethrower/Flamethrower.png"
    );
    this.maxAmmo = 10;
  }
  GiveAmmo(Target = new Player()) {
    Target.weapons.weaponInfo += this.maxAmmo;
  }
  interaction(Player) {
    super.interaction();
    this.GiveAmmo(Player);
    this.sound.play();
  }
}
