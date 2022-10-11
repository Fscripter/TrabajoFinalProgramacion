class AmmoHUD {
  constructor(ammountBullets) {
    this.ammo = ammountBullets;
    this.ammountImage = new ImagenDerogada("./Sprites/Menu/UI/Balas.png");
  }
  draw(context, position) {
    // context.drawImage(this.ammountImage, position.x + 70, position.y, 35, 35);
    // context.font = "bolder 25px lobster";
    // context.fillStyle = "#ffffff";
    // context.fillText(`x${this.ammo}`, position.x + 115, position.y + 25);
  }
  updateAmmount(ammo) {
    this.ammo = ammo;
  }
}
