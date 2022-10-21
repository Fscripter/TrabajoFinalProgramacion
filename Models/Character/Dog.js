class Dog extends Character {
  constructor(position) {
    super(
      position,
      { w: 50, h: 50 },
      "./Sprites/Dog/Derecha/DogRight.png",
      0,
      {
        states: ["Estatico", "Caminar", "Saltar", "Caer", "Curar"],
        animations: [
          {
            id: "Estatico",
            transitionTime: 100,
            loop: false,
            animaciones: {
              derecha: [new ImagenDerogada("./Sprites/Dog/Derecha/DogRight.png")],
              izquierda: [new ImagenDerogada("./Sprites/Dog/Izquierda/DogLeft.png")],
            },
          },
          {
            id: "Caminar",
            transitionTime: 200,
            loop: true,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Dog/Derecha/Caminar/1.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Caminar/2.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Caminar/3.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Caminar/4.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Dog/Izquierda/Caminar/1.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Caminar/2.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Caminar/3.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Caminar/4.png"),
              ],
            },
          },
          {
            id: "Saltar",
            transitionTime: 0,
            loop: false,
            animaciones: {
              derecha: [new ImagenDerogada("./Sprites/Dog/Derecha/Saltando/1.png")],
              izquierda: [new ImagenDerogada("./Sprites/Dog/Izquierda/Saltando/1.png")],
            },
          },
          {
            id: "Caer",
            transitionTime: 0,
            loop: false,
            animaciones: {
              derecha: [new ImagenDerogada("./Sprites/Dog/Derecha/Cayendo/1.png")],
              izquierda: [new ImagenDerogada("./Sprites/Dog/Izquierda/Cayendo/1.png")],
            },
          },
          {
            id: "Curar",
            transitionTime: 500,
            loop: false,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Dog/Derecha/Curando/1.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Curando/2.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Curando/3.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Curando/3.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Dog/Izquierda/Curando/1.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Curando/2.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Curando/3.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Curando/3.png"),
              ],
            },
          },
        ],
      },
      new ImagenDerogada("./Sprites/Player/Face.png"),
      {
        bulletType: Bullet,
        coolDown: 4000,
      },
      50,
      {
        normal: {
          x: 0,
          y: 35,
        },
        down: {
          x: 0,
          y: 58,
        },
      }
    );
    this.timeToHeal = 10000;
    this.forHealing = 20;
    this.timeElapsed = 0;
    this.stateData.Healing = false;
    this.audio = new Audio("./Sprites/Dog/Aullido/Aullido.mp3");
  }
  updateTime() {
    this.timeElapsed += 1000 / 60;
    if (this.timeElapsed > this.timeToHeal && this.Amo.alive) {
      this.Healing();
      this.timeElapsed = 0;
      this.stateData.Healing = true;
      console.log("curando");
      this.audio.play();
      this.changeState();
    }
    if (this.stateData.Healing == true && this.animation.lastFrame) {
      this.stateData.Healing = false;
    }
  }
  getPlayer(player = Player) {
    this.Amo = player;
  }

  Healing() {
    this.Amo.heal(this.forHealing);
  }
  draw(context) {
    this.updateTime();
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
    if (this.stateData.Healing == true) {
      this.animation.changeState("Curar");
      return;
    }
    if (this.physicsData.isGround && this.stateData.moving) {
      this.animation.changeState("Caminar");
      return;
    }
    if (this.physicsData.isGround && this.stateData.duck) {
      this.animation.changeState("Estatico");
      return;
    }

    this.animation.changeState("Estatico");
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
  getDown() {
    if (this.stateData.moving == true) {
      this.getUp();
      return;
    }
    this.stateData.duck = true;
    this.collider.changeState("Estatico");
  }
}
