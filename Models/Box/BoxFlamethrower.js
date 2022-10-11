class flamethrower extends Box {
  constructor(position) {
    super(position, {
      w: 100,
      h: 50,
    });
    this.maxAmmo = 100;
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
