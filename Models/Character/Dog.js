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
              derecha: [
                new ImagenDerogada("./Sprites/Dog/Derecha/DogRight.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Dog/Izquierda/DogLeft.png"),
              ],
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
              derecha: [
                new ImagenDerogada("./Sprites/Dog/Derecha/Saltando/1.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Dog/Izquierda/Saltando/1.png"),
              ],
            },
          },
          {
            id: "Caer",
            transitionTime: 0,
            loop: false,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Dog/Derecha/Cayendo/1.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Dog/Izquierda/Cayendo/1.png"),
              ],
            },
          },
          {
            id: "Curar",
            transitionTime: 30,
            loop: false,
            animaciones: {
              derecha: [
                new ImagenDerogada("./Sprites/Dog/Derecha/Curando/1.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Curando/2.png"),
                new ImagenDerogada("./Sprites/Dog/Derecha/Curando/3.png"),
              ],
              izquierda: [
                new ImagenDerogada("./Sprites/Dog/Izquierda/Curando/1.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Curando/2.png"),
                new ImagenDerogada("./Sprites/Dog/Izquierda/Curando/3.png"),
              ],
            },
          },
        ],
      },
      new ImagenDerogada("./Sprites/Player/Face.png"),
      {
        bulletType: Bullet,
        coolDown: 250,
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
    this.forHealing = 20;
  }

  Healing(Target = new Player()) {
    Target.life += this.forHealing;
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
    if (this.physicsData.isGround && this.stateData.duck) {
      this.animation.changeState("Agachar");
      return;
    }
    this.animation.changeState("Estatico");
  }
}
