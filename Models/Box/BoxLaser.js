class BoxLaser extends Box {
  constructor(
    position,
    size = {
      w: 50,
      h: 50,
    },
    sprite = "./Sprites/Objects/Caja/BoxTNT/TNT.png"
  ) {
    super(position, size, sprite);
    this.maxAmmo = 20;
    this.sound = new Audio("./Sprites/Objects/Ammo.mp3");
  }
  GiveAmmo(Target = new Player()) {
    Target.weapons.weaponInfo.laser += this.maxAmmo;
  }
  interaction(Player) {
    super.interaction();
    this.GiveAmmo(Player);
    this.sound.play();
  }
}
