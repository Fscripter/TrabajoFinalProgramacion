class weaponHud {
  constructor() {
    this.weaponInfo = {
      grenade: 5,
      bullet: 10,
      laser: 30,
      flamethrower: 50,
    };
    this.weaponImage = {
      grenade: new ImagenDerogada("./Sprites/Player/Weapons/Grenade.png"),
      laser: new ImagenDerogada("./Sprites/Player/Weapons/Laser.png"),
      bullet: new ImagenDerogada("./Sprites/Player/Weapons/Rifle.png"),
      flamethrower: new ImagenDerogada("./Sprites/Player/Weapons/Flamethrower.png"),
    };
    this.weapons = ["bullet", "laser", "grenade", "flamethrower"];
    this.changeWeapon(1);
    this.changeImage();
  }
  draw(context, position) {
    context.fillRect(position.x + 60, position.y - 6, 100, 50);
    context.drawImage(this.weaponImageRender, position.x + 70, position.y, 35, 35);
    context.font = "bolder 25px lobster";
    context.fillStyle = "#ffffff";
    context.fillText(`x ${this.weaponInfo[this.currentWeapon]}`, position.x + 115, position.y + 25);
  }
  changeWeapon(newWeapon) {
    if (this.weapons[newWeapon - 1] == undefined) {
      console.log("Arma no soportada");
      return;
    }
    this.currentWeapon = this.weapons[newWeapon - 1];
    this.currentAmmo = this.weaponInfo[this.currentWeapon];
    console.log(this.currentAmmo);
    this.changeImage();
  }
  decreaseAmmount() {
    this.weaponInfo[this.currentWeapon]--;
    this.currentAmmo = this.weaponInfo[this.currentWeapon];
  }
  changeImage() {
    this.weaponImageRender = this.weaponImage[this.currentWeapon];
  }
}
