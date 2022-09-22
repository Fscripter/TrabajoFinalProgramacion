class Mapa {
  constructor() {
    this.canvas = document.getElementById("Game-ViewPort");
    this.context = this.canvas.getContext("2d");
    this.canvasPosition = {
      x: 0,
      y: 0,
    };
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
    this.endless = new Array();
  }
  mover(vel) {
    this.canvasPosition.x -= vel;
  }
  movimientoY(posicionY) {
    this.canvasPosition.y = -posicionY + 300;
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
  cargarSonido() {
    this.ambientSound = new Audio(this.mapaData.sound.ambiente);
    this.ambientSound.loop = true;
    this.ambientSound.play();
  }
  letterToTexture(struct, width = 50, heigth = 50) {
    let { fila, columna, letter, texture } = struct;

    if (this.mapaArray[fila][columna] == letter) {
      if (width == 50 && heigth == 50) {
        this.context.drawImage(texture, columna * 50, fila * 50, width, heigth);
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
  cargarZona(name, Menu) {
    this.correctStatus = false;
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
        this.cargarSonido();
        this.draw();
        Menu.finalizarCarga(this);
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
      -this.canvasPosition.y,
      this.canvas.width,
      650
    );

    for (let fila = 0; fila < this.mapaArray.length; fila++) {
      for (let columna = 0; columna < this.sizeMap; columna += 1) {
        this.letterToTexture({ letter: "T", texture: this.texturas.T, columna, fila });
        this.letterToTexture({ letter: "S", texture: this.texturas.S, columna, fila });
        this.letterToTexture({ letter: "I", texture: this.texturas.L, columna, fila });
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
    this.context.translate(this.canvasPosition.x, this.canvasPosition.y);
  }
}
