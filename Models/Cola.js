class ColaHUD {
  constructor() {
    this.queue = [];
    this.posicion = {
      x: 0,
      y: 15,
    };
  }
  dibujar(ctx) {
    // console.log(this.queue);
    for (let itemsCola = 0; itemsCola < this.queue.length; itemsCola++) {
      let posicionItem = {
        x: -this.posicion.x + 900,
        y: this.posicion.y + itemsCola * 80,
      };
      this.queue[itemsCola].HUD.draw(ctx, posicionItem);
    }
    this.actualizarCola();
  }
  add(item) {
    this.queue.push(item);
  }
  actualizarCola() {
    this.queue = [];
  }
  actualizarPosicion(posicion) {
    this.posicion.x = posicion.x;
    this.posicion.y = -posicion.y + 15;
  }
}
