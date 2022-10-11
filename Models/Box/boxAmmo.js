class boxAmmo extends Box {
  constructor(position) {
    super(
      position,
      {
        w: 100,
        h: 50,
      },
      "./Sprites/Objects/Caja/BoxRifle/Rifle.png"
    );
    this.maxAmmo = 30;
    this.sound = new Audio("./Sprites/Objects/Ammo.mp3");
  }
  GiveAmmo(Target = new Player()) {
    Target.weapons.weaponInfo.bullet += this.maxAmmo;
  }
  interaction(Player) {
    super.interaction();
    this.GiveAmmo(Player);
    this.sound.play();
  }
}
