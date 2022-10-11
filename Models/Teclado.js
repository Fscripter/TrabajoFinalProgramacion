class Teclado {
  constructor(player, mapaCanvas, deltaTime) {
    this.player = player;
    this.keyMap = {};
    this.eventosTeclado();
    this.deltaTime = deltaTime;
    this.mapaCanvas = mapaCanvas;
    this.ambasTeclas = {
      a: false,
      d: false,
    };
    this.once = false;
  }
  chequearAmbasTeclas() {
    if (this.ambasTeclas.a && this.ambasTeclas.d) {
      this.player.stateData.moving = false;
    }
    if (!this.ambasTeclas.a && !this.ambasTeclas.d) {
      this.player.stateData.moving = false;
    }
    if (
      (this.ambasTeclas.a && !this.ambasTeclas.d) ||
      (this.ambasTeclas.d && !this.ambasTeclas.a)
    ) {
      this.player.stateData.moving = true;
    }
  }
  realizarAccion() {
    for (const [key, value] of Object.entries(this.keyMap)) {
      if (key == "w" && value) {
        this.player.jump();
      }
      if (key == "d" && value) {
        this.ambasTeclas.d = true;
        this.player.move(50 * this.deltaTime, this); // move player and world
        this.player.getDown();
      }
      if (key == "a" && value) {
        this.ambasTeclas.a = true;
        this.player.move(-50 * this.deltaTime, this);
        this.player.getUp();
      }
      if (key == "d" && !value) {
        this.ambasTeclas.d = false;
      }
      if (key == "a" && !value) {
        this.ambasTeclas.a = false;
      }
      if (key == "s" && value && !this.player.stateData.moving) {
        this.player.getDown();
      }
      if (key == "s" && !value) {
        this.player.getUp();
      }
      this.chequearAmbasTeclas();
      if (key == " " && value) {
        this.player.shoot();
      }
      if ((key == "1" || key == "2" || key == "3" || key == "4") && value) {
        this.player.changeWeapon(Number(key));
      }
    }
  }
  eventosTeclado() {
    window.addEventListener("keydown", (event) => {
      this.keyMap[event.key] = true;
    });
    window.addEventListener("keyup", (event) => {
      this.keyMap[event.key] = false;
    });
  }
}
