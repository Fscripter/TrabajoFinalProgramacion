class Dog extends Character {
  constructor(position) {
    super(position, { w: 50, h: 50 }, "../../Sprites/Dog/DogBase.png", 0, {
      states: ["Estatico", "Caminar", "Saltar", "Caer", "Curar"],
      animations: [
        {
          id: "Estatico",
          transitionTime: 100,
          loop: false,
          animaciones: {
            derecha: [new ImagenDerogada("./Sprites/Dog/DogRight.png")],
            izquierda: [new ImagenDerogada("./Sprites/Dog/DogLeft.png")],
          },
        },
        {
          id: "Caminar",
          transitionTime: 200,
          loop: true,
          animaciones: {
            derecha: [
              new ImagenDerogada("./Sprites/Dog/Caminar/Derecha/1.png"),
              new ImagenDerogada("./Sprites/Dog/Caminar/Derecha/2.png"),
              new ImagenDerogada("./Sprites/Dog/Caminar/Derecha/3.png"),
              new ImagenDerogada("./Sprites/Dog/Caminar/Derecha/4.png"),
            ],
            izquierda: [
              new ImagenDerogada("./Sprites/Dog/Caminar/Izquierda/1.png"),
              new ImagenDerogada("./Sprites/Dog/Caminar/Izquierda/2.png"),
              new ImagenDerogada("./Sprites/Dog/Caminar/Izquierda/3.png"),
              new ImagenDerogada("./Sprites/Dog/Caminar/Izquierda/4.png"),
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
    });
    this.forHealing = 20;
  }

  Healing(Target = new Player()) {
    Target.life += this.forHealing;
  }
  draw(context) {
    this.changeState();
    super.draw(context);
  }
}
