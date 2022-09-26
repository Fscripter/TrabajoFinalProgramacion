let InitialCinematicas = {
  subdito: {
    posicion: {
      x: 0,
      y: 0,
    },
    imagen: "",
    descripcion: "Era un buen niño",
    cinematicDone: false,
  },
  boss: {
    posicion: {
      x: 0,
      y: 0,
    },
    imagen: "",
    descripcion: "Era una llorona",
    cinematicDone: false,
  },
};

class Cinematica {
  //Follows player
  constructor(posicion) {
    this.posicion = posicion;
    this.timeTransition = 5000; // 1 segundo de cinematica
    this.timeElapsed = 0;
    this.deltaTime = 1000 / 60;
    this.doAnimation = false;
  }
  increaseTime() {
    if (this.doAnimation) {
      if (this.timeElapsed > this.timeTransition) {
        this.doAnimation = false;
        return;
      }
      this.timeElapsed += this.deltaTime;
    }
  }
  transition() {
    if (
      -this.canvasPosicion.x >= this.posicion.x - 480 &&
      this.canvasPosicion.x < this.posicion.x
    ) {
      this.doAnimation = true;
      console.log("Hi");
    }
  }
  draw(canvas, canvasPosicion) {
    console.log(canvasPosicion.x + 500);
    this.canvasPosicion = canvasPosicion;
    this.render();
    let posicionDraw = {
      x: -this.canvasPosicion.x,
      y: -this.canvasPosicion.y,
    };
    if (this.doAnimation) {
      canvas.fillStyle = "#000000";
      canvas.fillRect(posicionDraw.x, posicionDraw.y - 300, 1000, 400);
      canvas.fillStyle = "#000000";
      canvas.fillRect(posicionDraw.x, posicionDraw.y + 500, 1000, 200);
    }
  }
  render() {
    this.transition();
    this.increaseTime();
  }
}
