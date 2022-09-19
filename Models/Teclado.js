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
      this.player.caminando = true;
      this.player.cambiarEstado();
    }
    if (this.player.caminando == false) {
      this.player.cambiarEstado();
    }
  }
  realizarAccion() {
    for (const [key, value] of Object.entries(this.keyMap)) {
      if (key == "w" && value) {
        this.player.salto();
      }
      if (key == "d" && value) {
        this.ambasTeclas.d = true;
        this.player.mover(50 * this.deltaTime); // move player and world
        this.mapaCanvas.canvasPosition.x -= 50 * this.deltaTime;
      }
      if (key == "a" && value) {
        this.ambasTeclas.a = true;
        this.player.mover(-50 * this.deltaTime); // move player and world
        this.mapaCanvas.canvasPosition.x += 50 * this.deltaTime;
      }
      if (key == "d" && !value) {
        this.ambasTeclas.d = false;
      }
      if (key == "a" && !value) {
        this.ambasTeclas.a = false;
      }
      this.chequearAmbasTeclas();
      if (key == " " && value) {
        this.player.disparar();
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
