class Enemy extends Character {
  constructor(position, id, padreArr) {
    super(
      position,
      { w: 50, h: 100 },
      "./Sprites/Player/Derecha.png",
      100,
      {
        states: ["Estatico", "Caminar", "Saltar", "Caer"],
        animations: [
          {
            id: "Estatico",
            transitionTime: 100,
            animaciones: {
              derecha: [new ImagenDerogada("./Sprites/Enemys/Antioquia/Estatico/Derecha.png")],
              izquierda: [new ImagenDerogada("./Sprites/Player/Izquierda.png")],
            },
          },
          {
            id: "Caminar",
            transitionTime: 200,
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
          {
            id: "Saltar",
            transitionTime: 0,
            animaciones: {
              derecha: [new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose1.png")],
              izquierda: [new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose1.png")],
            },
          },
          {
            id: "Caer",
            transitionTime: 0,
            animaciones: {
              derecha: [new ImagenDerogada("./Sprites/Player/Salto/Derecha/Pose6.png")],
              izquierda: [new ImagenDerogada("./Sprites/Player/Salto/Izquierda/Pose6.png")],
            },
          },
        ],
      },
      new ImagenDerogada("./Sprites/Enemys/Antioquia/Face.png"),
      {
        bulletType: BulletGun,
        coolDown: 150,
      }
    );
    this.type = "Enemy";
    this.id = id;
    this.father = padreArr;
  }
  delete() {
    this.father.enemys.map((enemy, index) => {
      if (enemy.id == this.id) {
        this.lastID = this.id;
        this.id = index;
      }
    });
    this.father.enemys.splice(this.id, 1);
    console.log(this);
    return this.lastID;
  }
  move(vel) {
    if (this.canIMove.l || this.canIMove.r) {
      super.move(vel);
      this.orientation = "L";
      if (vel > 0) {
        this.orientation = "R";
      }
      this.animation.changeOrientation(this.orientation);
    }
  }
  draw(context) {
    this.changeState();
    super.draw(context);
  }
  changeState() {
    //Each one, defines own rules for animations
    if (this.stateData.jumping == false && !this.physicsData.isGround) {
      this.animation.changeState("Caer");
      return;
    }
    if (this.stateData.jumping == true && !this.physicsData.isGround) {
      this.animation.changeState("Saltar");
      return;
    }
    if (this.physicsData.isGround && this.stateData.moving) {
      this.animation.changeState("Caminar");
      return;
    }
    this.animation.changeState("Caminar");
  }
  IA(
    playerData = {
      positionWorld: {
        x: Number,
        y: Number,
      },
      life: Number,
      ammount: Number,
    },
    worldInfo = {
      l: false,
      r: false,
    },
    bulletsArray
  ) {
    if (playerData.ammount < 30) {
      if (playerData.positionWorld.x > this.positionWorld.x) {
        this.move(2);
      } else {
        this.move(-2);
      }
    } else {
      if (playerData.positionWorld.x > this.positionWorld.x) {
        this.move(-2);
      } else {
        this.move(2);
      }
    }
  }
}
