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
  constructor(cinematicas = InitialCinematicas, posicion) {
    this.cinematicas = cinematicas;
    this.timeTransition = 5000; // 1 segundo de cinematica
    this.timeElapsed = 0;
    this.deltaTime = 1000 / 60;
    this.posicion = posicion;
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
      this.posicion.x >= this.cinematicas.subdito.posicion.x - 480 &&
      this.posicion.x < this.cinematicas.subdito.posicion.x
    ) {
      this.doAnimation = true;
      console.log("Aqui hay cine");
    }
  }
  dibujar(canvas) {
    this.render();
    if (this.doAnimation) {
      canvas.fillStyle = "#000000";
      canvas.fillRect(this.posicion.x - 500, this.posicion.y - 600, 1000, 400);
      canvas.fillStyle = "#000000";
      canvas.fillRect(this.posicion.x - 500, this.posicion.y + 200, 1000, 200);
    }
  }
  render() {
    this.transition();
    this.increaseTime();
  }
  doCinematic() {}
}
