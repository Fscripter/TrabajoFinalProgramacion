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
      Arbol: {
        A: new Image(),
        B: new Image(),
        C: new Image(),
        D: new Image(),
      },
      L: new Image(),
      D: new Image(),
      Layout: new Image(),
    };
  }
  mover(vel) {
    this.canvasPosition.x -= vel;
  }
  cargarTexuras() {
    this.texturas.S.src = this.mapaData.texturas.S;
    this.texturas.T.src = this.mapaData.texturas.T;
    this.texturas.Arbol.A.src = this.mapaData.texturas.Arbol.A;
    this.texturas.Arbol.B.src = this.mapaData.texturas.Arbol.B;
    this.texturas.Arbol.C.src = this.mapaData.texturas.Arbol.C;
    this.texturas.Arbol.D.src = this.mapaData.texturas.Arbol.D;
    this.texturas.L.src = this.mapaData.texturas.L;
    this.texturas.D.src = this.mapaData.texturas.D;
    this.texturas.Layout.src = this.mapaData.texturas.Layout;
  }
  letterToTexture(struct, width = 50, heigth = 50) {
    let { fila, columna, letter, texture } = struct;

    if (this.mapaArray[fila][columna] == letter) {
      if (width == 50 && heigth == 50) {
        this.context.drawImage(texture, columna * 50, (fila + 1) * 50, width, heigth);
        return;
      }
      this.context.drawImage(
        texture,
        columna * 50 - width / 1.75,
        (fila + 2) * 50 - heigth,
        width,
        heigth
      );
    }
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
        console.log(this.mapaArray);
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
    this.context.drawImage(this.texturas.Layout, -this.canvasPosition.x, 0, this.canvas.width, 600);

    for (let fila = 0; fila < 11; fila++) {
      for (let columna = 0; columna < this.sizeMap; columna += 1) {
        this.letterToTexture({ letter: "T", texture: this.texturas.T, columna, fila });
        this.letterToTexture({ letter: "S", texture: this.texturas.S, columna, fila });
        this.letterToTexture({ letter: "L", texture: this.texturas.L, columna, fila });
        this.letterToTexture({ letter: "D", texture: this.texturas.D, columna, fila });

        //Trees
        this.letterToTexture(
          { letter: "A", texture: this.texturas.Arbol.A, columna, fila },
          250,
          300
        );
        this.letterToTexture(
          { letter: "B", texture: this.texturas.Arbol.B, columna, fila },
          250,
          300
        );
        this.letterToTexture(
          { letter: "C", texture: this.texturas.Arbol.C, columna, fila },
          200,
          300
        );
      }
    }
  }
  limpiar() {
    this.canvas.width = this.canvas.width;
    this.context.translate(this.canvasPosition.x, 0);
  }
}
