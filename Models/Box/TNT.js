class TNT extends Box {
  constructor(
    position,
    size = {
      w: 50,
      h: 50,
    },
    sprite = "./Sprites/Objects/Caja/BoxTNT/TNT.png"
  ) {
    super(position, size, sprite);
    this.damage = 80;
    this.radius = 350;
    this.isblow = false;
    this.activeRadius = this.radius;
    this.animation = new Animator(
      {
        states: ["No interaccion", "Explosion"],
        animations: [
          {
            id: "No interaccion",
            loop: false,
            transitionTime: 100,
            animaciones: {
              derecha: [new ImagenDerogada(sprite)],
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
  blow(Player, enemysArray, callback = () => {}) {
    // console.log(this.isblow);
    if (this.isblow == false) {
      return;
    }
    enemysArray = enemysArray.concat(Player);
    enemysArray.forEach((enemy) => {
      let X = Math.abs(enemy.positionWorld.x - this.positionWorld.x);
      let Y = Math.abs(enemy.positionWorld.y - this.positionWorld.y);
      let radioInteraccion = Math.pow(X, 2) + Math.pow(Y, 2); // X.X + Y.Y = R.R
      if (radioInteraccion <= Math.pow(this.radius, 2) && enemy.alive) {
        enemy.doDamage(this.damage, callback);
      }
    });
    this.changeState();
    this.sound.play();
  }
  interaction(Player, enemysArray, callback = () => {}) {
    this.changeEvent();
    this.blow(Player, enemysArray, callback);
  }
  changeState() {
    this.animation.changeState("Explosion");
  }
  changeEvent() {
    this.isblow = true;
  }
  checkLastFrame() {
    if (this.animation.lastFrame && this.isblow) {
      this.active = false;
    }
  }
  draw(context) {
    this.imagen = this.animation.drawAnimation();
    this.checkLastFrame();
    super.draw(context);
    if (this.isblow && this.active) {
      this.activeRadius -= this.radius / 30;
      if (!(this.activeRadius > 0)) {
        this.activeRadius = 0;
      }
      context.beginPath();
      context.fillStyle = "rgba(255,0,0,0.4)";
      context.arc(this.positionWorld.x, this.positionWorld.y, this.activeRadius, 0, Math.PI * 2);
      context.fill();
      context.closePath();
    }
  }
}
