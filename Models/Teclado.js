class Teclado {
  constructor(player, mapaCanvas, deltaTime) {
    this.player = player;
    this.keyMap = {};
    this.eventosTeclado();
    this.deltaTime = deltaTime;
    this.mapaCanvas = mapaCanvas;
  }
  realizarAccion() {
    console.log(this.keyMap);
    for (const [key, value] of Object.entries(this.keyMap)) {
      if (key == "w" && value) {
        this.player.salto();
      }
      if (key == "d" && value) {
        this.player.mover(50 * this.deltaTime); // move player and world
        this.mapaCanvas.canvasPosition.x -= 50 * this.deltaTime;
      }
      if (key == "a" && value) {
        this.player.mover(-50 * this.deltaTime); // move player and world
        this.mapaCanvas.canvasPosition.x += 50 * this.deltaTime;
      }
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
