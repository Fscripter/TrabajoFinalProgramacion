class Teclado {
  constructor(player, deltaTime) {
    this.player = player;
    this.keyMap = {};
    this.eventosTeclado();
    this.deltaTime = deltaTime;
  }
  realizarAccion() {
    console.log(this.keyMap);
    for (const [key, value] of Object.entries(this.keyMap)) {
      if ((key == " " || key == "w") && value) {
        this.player.salto();
      }
      if (key == "d" && value) {
        this.player.mover(50 * this.deltaTime);
      }
      if (key == "a" && value) {
        this.player.mover(-50 * this.deltaTime);
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
