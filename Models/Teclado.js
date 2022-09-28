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
      this.player.caminando = false;
    }
    if (!this.ambasTeclas.a && !this.ambasTeclas.d) {
      this.player.caminando = false;
    }
    if (
      (this.ambasTeclas.a && !this.ambasTeclas.d) ||
      (this.ambasTeclas.d && !this.ambasTeclas.a)
    ) {
      this.player.stateData.moving = true;
    }
    if (!this.ambasTeclas.a && !this.ambasTeclas.d) {
      this.player.stateData.moving = false;
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
      }
      if (key == "a" && value) {
        this.ambasTeclas.a = true;
        this.player.move(-50 * this.deltaTime, this);
      }
      if (key == "d" && !value) {
        this.ambasTeclas.d = false;
      }
      if (key == "a" && !value) {
        this.ambasTeclas.a = false;
      }
      this.chequearAmbasTeclas();
      if (key == " " && value) {
        this.player.shoot();
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
