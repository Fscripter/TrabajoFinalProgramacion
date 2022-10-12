class BoxGrenade extends Box {
  constructor(
    position,
    size = {
      w: 50,
      h: 50,
    },
    sprite = "./Sprites/Objects/Caja/BoxGrenade/Grenade.png"
  ) {
    super(position, size, sprite);
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
