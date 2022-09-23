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
    this.enemigos = []; // Enemigos coleccion
    this.totalEnemigos = {
      tipo: {
        1: 0,
        2: 0,
        3: 0,
      },
      Total: 0,
    };
  }
  spawnEnemigos(Data, posicion) {
    switch (Data) {
      case "1":
        this.enemigos.push(new Enemy(posicion, 1));
        break;
      case "2":
        this.enemigos.push(new Enemy(posicion, 2));
        break;
      case "3":
        this.enemigos.push(new Enemy(posicion, 3));
        break;
      case "0":
        this.enemigos.push(new Enemy(posicion, 0));
        break;
      default:
        break;
    }
    console.log(Data);
  }
  crearEnemigos() {
    //Buscar enemigos en el mapa
    this.getSizeMap();
    for (let fila = 0; fila < this.mapaArray.length; fila++) {
      for (let columna = 0; columna < this.sizeMap; columna++) {
        this.spawnEnemigos(this.mapaArray[fila][columna], {
          x: columna * 50,
          y: fila * 25,
        });
      }
    }
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
        this.crearEnemigos();
        Menu.finalizarCarga(this);
      });
  }
  // Thinking about delete viewport

  getSizeMap() {
    this.sizeMap = 0;
    this.mapaArray.forEach((element) => {
      if (element.length > this.sizeMap) {
        this.sizeMap = element.length;
      }
    });
  }
  draw() {
    this.getSizeMap();
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
    this.enemigos.forEach((enemigo) => {
      enemigo.dibujar(this.context, this.canvasPosition);
    });
  }
  limpiar() {
    this.canvas.width = this.canvas.width;
    this.context.translate(this.canvasPosition.x, this.canvasPosition.y);
  }
}
