class Mapa {
  constructor() {
    this.zonas = ["Pacifico", "Antioquia", "Amazonia"];
    this.canvas = document.getElementById("Game-ViewPort");
    this.context = this.canvas.getContext("2d");
    this.canvasPosition = {
      x: 0,
    };
    this.columnaIndice = 0;
    this.texturas = {
      S: new Image(),
      T: new Image(),
      A: new Image(),
      L: new Image(),
      D: new Image(),
      Layout: new Image(),
    };
  }
  move(vel) {
    this.canvasPosition.x -= vel;
  }
  cargarTexuras() {
    this.texturas.S.src = this.mapaData.texturas.S;
    this.texturas.T.src = this.mapaData.texturas.T;
    this.texturas.A.src = this.mapaData.texturas.A;
    this.texturas.L.src = this.mapaData.texturas.L;
    this.texturas.D.src = this.mapaData.texturas.D;
    this.texturas.Layout.src = this.mapaData.texturas.Layout;
  }
  //
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

        this.cargarTexuras();
        this.draw();
      });
  }
  // Thinking about delete viewport
  draw() {
    this.sizeMap = 0;
    this.mapaArray.forEach((element) => {
      if (element.length > this.sizeMap) {
        this.sizeMap = element.length;
      }
    });
    this.context.drawImage(
      this.texturas.Layout,
      -this.canvasPosition.x,
      0,
      this.canvas.width,
      600
    );

    for (let fila = 0; fila < 11; fila++) {
      for (let columna = 0; columna < this.sizeMap; columna += 1) {
        if (this.mapaArray[fila][columna] == "T") {
          this.context.drawImage(
            this.texturas.T,
            columna * 50,
            (fila + 1) * 50,
            50,
            50
          );
        }
        if (this.mapaArray[fila][columna] == "S") {
          this.context.drawImage(
            this.texturas.S,
            columna * 50,
            (fila + 1) * 50,
            50,
            50
          );
        }
        if (this.mapaArray[fila][columna] == "A") {
          this.context.drawImage(
            this.texturas.A,
            columna * 50 - 75,
            (fila + 1) * 50 - 245,
            200,
            300
          );
        }
        if (this.mapaArray[fila][columna] == "L") {
          this.context.drawImage(
            this.texturas.L,
            columna * 50,
            (fila + 1) * 50,
            50,
            50
          );
        }
        if (this.mapaArray[fila][columna] == "D") {
          this.context.drawImage(
            this.texturas.D,
            columna * 50,
            (fila + 1) * 50,
            50,
            50
          );
        }
      }
    }
  }
  limpiar() {
    this.canvas.width = this.canvas.width;
    this.context.translate(this.canvasPosition.x, 0);
  }
}
