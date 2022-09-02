class Mapa {
  constructor() {
    this.zonas = ["Pacifico", "Antioquia", "Amazonia"];
    this.screenSize = {
      x: 1000,
      y: 500,
    };
    this.zonaIndex = 0;
    this.zonaActual = this.zonas[this.zonaIndex];
    this.canvas = document.getElementById("Game-ViewPort");
    this.context = this.canvas.getContext("2d");
    this.columnaIndice = 0;
  }
  dibujar() {}
  cargarZona(name) {
    fetch(`MapData/${name}.json`)
      .then((response) => {
        return response.json();
      })
      .then((rawJson) => {
        this.mapaData = rawJson;
        //Obtengo el json
        //Accedo a la data del mapa
        this.mapaRawData = this.mapaData.Mapa.map((elemento) => {
          return elemento.join().split("");
        });
      });
  }
  cambiarZona() {}
  update(callback) {
    callback();
  }
  viewPort() {
    this.mapinha = [];
    //Extraer nada mas el viewport
    for (let fila = 0; fila < this.mapaRawData.length; fila++) {
      let filas = [];

      if (this.mapaRawData[fila] != undefined) {
        for (
          let columna = this.columnaIndice;
          columna < this.columnaIndice + 20;
          columna++
        ) {
          filas.push(this.mapaRawData[fila][columna]);
        }
      }

      this.mapinha.push(filas);
    }
  }
  moveViewPort() {}
  limpiar() {
    this.canvas.width = this.screenSize.x;
  }
  dibujarMapa() {
    this.viewPort();
    // Dibujar solo lo que este en el canvas de mi posicion hasta 20
    for (let fila = 0; fila < 11; fila++) {
      // Uso de palabras claves
      for (let columna = 0; columna < 20; columna += 1) {
        if (this.mapinha[fila][columna] == "T") {
          this.context.beginPath();
          this.context.fillStyle = "#ff0000";
          this.context.fillRect(columna * 50, (fila + 1) * 50, 50, 50);
        }
        if (this.mapinha[fila][columna] == "S") {
          this.context.beginPath();
          this.context.fillStyle = "#000000";
          this.context.fillRect(columna * 50, (fila + 1) * 50, 50, 50);
        }
      }
    }
  }
}
