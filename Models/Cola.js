class ColaHUD {
  constructor() {
    this.queue = [];
    this.posicion = {
      x: 0,
      y: 15,
    };
  }
  dibujar(ctx) {
    for (let itemsCola = 0; itemsCola < this.queue.length; itemsCola++) {
      let posicionItem = {
        x: -this.posicion.x + 1000,
        y: this.posicion.y + itemsCola * 70,
      };
      this.queue[itemsCola].getVida(ctx, posicionItem);
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
  }
}
