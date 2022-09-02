class Mapa {
  constructor() {
    this.zonas = ["Pacifico", "Antioquia", "Amazonia"];
    this.canvas= document.getElementById("Game-ViewPort");
    this.context =  this.canvas.getContext("2d");
    this.columnaIndice = 0;
  }
  cargarZona(name) {
    fetch(`MapData/${name}.json`)
      .then((response) => {
        return response.json();
      })
      .then((rawJson) => {
        //Accedo a la data del mapa
        this.mapaData = rawJson;

        //Obtengo el array del mapa
        this.mapaArray = this.mapaData.Mapa.map((elemento) => {
          return elemento.join().split("");
        });
      });
  }
  viewPort() {
    this.mapaView = [];
    //Extraer nada mas el viewport
    for (let fila = 0; fila < this.mapaArray.length; fila++) {
      let filas = [];

      if (this.mapaArray[fila] != undefined) {
        for (
          let columna = this.columnaIndice;
          columna < this.columnaIndice + 20;
          columna++
        ) {
          filas.push(this.mapaArray[fila][columna]);
        }
      }

      this.mapaView.push(filas);
    }
  }
  limpiar() {
    this.canvas.width = this.canvas.width;
  }
  dibujarMapa() {
    this.viewPort();
    // Dibujar solo lo que este en el viewPort
    for (let fila = 0; fila < 11; fila++) {
      for (let columna = 0; columna < 20; columna += 1) {
        if (this.mapaView[fila][columna] == "T") {
          this.context.beginPath();
          this.context.fillStyle = "#ff0000";
          this.context.fillRect(columna * 50, (fila + 1) * 50, 50, 50);
        }
        if (this.mapaView[fila][columna] == "S") {
          this.context.beginPath();
          this.context.fillStyle = "#000000";
          this.context.fillRect(columna * 50, (fila + 1) * 50, 50, 50);
        }
      }
    }
  }
}
