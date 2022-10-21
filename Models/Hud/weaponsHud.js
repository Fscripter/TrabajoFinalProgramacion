class weaponHud {
  constructor() {
    this.weaponInfo = {
      grenade: 5,
      rifle: 100,
      laser: 30,
      flamethrower: 50,
    };
    this.weaponCooldown = {
      grenade: 2000,
      rifle: 200,
      laser: 500,
      flamethrower: 200,
    };
    this.weaponImage = {
      grenade: new ImagenDerogada("./Sprites/Player/Weapons/Grenade.png"),
      laser: new ImagenDerogada("./Sprites/Player/Weapons/Laser.png"),
      rifle: new ImagenDerogada("./Sprites/Player/Weapons/Rifle.png"),
      flamethrower: new ImagenDerogada("./Sprites/Player/Weapons/Flamethrower.png"),
    };
    this.layout = new ImagenDerogada("./Sprites/Menu/UI/Weapon.png");
    this.weapons = ["rifle", "laser", "grenade", "flamethrower"];
    this.currentWeapon = this.weapons[0];
    this.changeWeapon(1);
    this.changeImage();
  }
  drawText(context, position) {
    context.font = "bolder 18px lobster center";
    context.fill();
    context.fillStyle = "#FFFFFF";
    context.fillText(
      `${this.weaponInfo[this.currentWeapon]}`,
      position.x + 85,
      position.y + 75,
      30
    );
  }
  draw(context, position) {
    context.drawImage(this.layout, position.x + 50, position.y, 100, 75);
    this.drawText(context, position);
    context.drawImage(this.weaponImageRender, position.x + 85, position.y + 20, 45, 45);
  }
  changeWeapon(newWeapon) {
    if (this.weapons[newWeapon - 1] == undefined) {
      console.log("Arma no soportada");
      return;
    }
    this.currentWeapon = this.weapons[newWeapon - 1];
    this.currentAmmo = this.weaponInfo[this.currentWeapon];
    this.currentCooldown = this.weaponCooldown[this.currentWeapon];
    this.changeImage();
  }
  decreaseAmmount() {
    this.weaponInfo[this.currentWeapon]--;
    this.currentAmmo = this.weaponInfo[this.currentWeapon];
    this.currentCooldown = this.weaponCooldown[this.currentWeapon];
  }
  changeImage() {
    this.weaponImageRender = this.weaponImage[this.currentWeapon];
  }
}
