class BoxGrenade extends Box {
  constructor(position) {
    super(
      position,
      {
        w: 100,
        h: 50,
      },
      "./Sprites/Objects/Caja/BoxGrenade/Grenade.png"
    );
    this.maxAmmo = 5;
    this.sound = new Audio("./Sprites/Objects/Ammo.mp3");
  }
  GiveAmmo(Target = new Player()) {
    Target.weapons.weaponInfo.grenade += this.maxAmmo;
  }
  interaction(Player) {
    super.interaction();
    this.GiveAmmo(Player);
    this.sound.play();
  }
}
