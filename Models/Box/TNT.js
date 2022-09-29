class TNT extends Box {
  constructor(position) {
    super(
      position,
      {
        w: 50,
        h: 50,
      },
      "./Sprites/Objects/TNT.png"
    );
    this.damage = 80;
    this.radius = 350;
    this.isblow = false;
    this.animation = new Animator(
      {
        states: ["No interaccion", "Explosion"],
        animations: [
          {
            id: "No interaccion",
            loop: false,
            transitionTime: 100,
            animaciones: {
              derecha: [new ImagenDerogada("./Sprites/Objects/Caja/BoxTNT/TNT.png")],
            },
          },
          {
            id: "Explosion",
            transitionTime: 200,
            loop: false,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Objects/Caja/BoxTNT/Frame1.png"),
                new ImagenDerogada("./Sprites/Objects/Caja/BoxTNT/Frame2.png"),
                new ImagenDerogada("./Sprites/Objects/Caja/BoxTNT/Frame3.png"),
                new ImagenDerogada("./Sprites/Objects/Caja/BoxTNT/Frame4.png"),
                new ImagenDerogada("./Sprites/Objects/Caja/BoxTNT/Frame5.png"),
                new ImagenDerogada("./Sprites/Objects/Caja/BoxTNT/Frame6.png"),
              ],
            },
          },
        ],
      },
      "R"
    );
    this.sound = new Audio("./Sprites/Objects/TNT.mp3");
  }
  blow(Player, enemysArray) {
    // console.log(this.isblow);
    if (this.isblow == false) {
      return;
    }
    enemysArray = enemysArray.concat(Player);
    enemysArray.forEach((enemy) => {
      let X = Math.abs(enemy.positionWorld.x - this.positionWorld.x);
      let Y = Math.abs(enemy.positionWorld.y - this.positionWorld.y);
      let radioInteraccion = Math.pow(X, 2) + Math.pow(Y, 2); // X.X + Y.Y = R.R
      console.log(radioInteraccion, Math.pow(this.radius, 2));
      if (radioInteraccion <= Math.pow(this.radius, 2)) {
        enemy.doDamage(this.damage);
        console.log(radioInteraccion);
      }
    });
    this.changeState();
    this.sound.play();
  }
  interaction(Player, enemysArray) {
    this.changeEvent();
    this.blow(Player, enemysArray);
  }
  changeState() {
    this.animation.changeState("Explosion");
  }
  changeEvent() {
    this.isblow = true;
  }
  draw(context) {
    this.imagen = this.animation.drawAnimation();
    super.draw(context);
  }
}
