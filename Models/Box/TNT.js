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
    this.damage = 40;
    this.radius = 150;
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
              derecha: [new ImagenDerogada("./Sprites/Objects/TNT.png")],
            },
          },
          {
            id: "Explosion",
            transitionTime: 200,
            loop: false,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose1.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose2.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose3.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose4.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose5.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Derecha/Pose6.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose1.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose2.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose3.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose4.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose5.png"),
                new ImagenDerogada("./Sprites/Player/Caminar/Izquierda/Pose6.png"),
              ],
            },
          },
        ],
      },
      "R"
    );
    this.changeState();
  }
  blow(Player, enemysArray) {
    if (this.isblow == false) {
      return;
    }
    for (enemy in enemysArray) {
      let X = Math.abs(enemy.positionWorld.position.x - this.positionWorld.x);
      let Y = Math.abs(enemy.positionWorld.position.y - this.positionWorld.y);
      let radioInteraccion = Math.pow(X, 2) + Math.pow(Y, 2); // X.X + Y.Y = R.R
      if (radioInteraccion <= Math.pow(this.radius, 2)) {
        enemy.doDamage(this.damage);
      }
    }
    this.active = false;
  }
  interaction(Player, enemysArray) {
    this.blow(Player, enemysArray);
  }
  changeState() {}
  changeEvent() {
    this.isblow = true;
  }
  draw(context) {
    this.imagen = this.animation.drawAnimation();
    super.draw(context);
  }
}
