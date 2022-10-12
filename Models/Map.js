class Mapa {
  constructor(engine) {
    this.canvas = document.getElementById("Game-ViewPort");
    this.context = this.canvas.getContext("2d");
    this.canvasPosition = {
      x: 0,
      y: 0,
    };
    this.texturasGenerator = new Textures();
    this.engine = engine;
  }
  cargarEscena(arr) {
    const dimensions = [arr.length, arr.reduce((x, y) => Math.max(x, y.length), 0)];
    console.log(dimensions);
  }
  mover(vel) {
    this.canvasPosition.x -= vel;
  }
  movimientoY(posicionY) {
    this.canvasPosition.y = -posicionY + 300;
  }
  cargarSonido() {
    this.ambientSound = new Audio(this.mapaData.sound.ambiente);
    this.ambientSound.loop = true;
    this.ambientSound.play();
  }
  letterToTexture(textura, posicion) {
    let allowedTextures = ["D", "C", "L", "R", "X", "Z", "V"];
    if (allowedTextures.indexOf(textura) == -1) {
      return;
    }
    // console.log(this.texturas.terreno, textura, this.texturas.terreno[textura]);
    this.context.drawImage(
      this.texturas.terreno[textura],
      posicion.x * 50,
      posicion.y * 50,
      50,
      50
    );
    return;
  }
  cargarZona(name, Menu) {
    this.correctStatus = false;
    fetch(`MapData/${name}/${name}.json`)
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
        // this.cargarTexuras();
        this.cargarSonido();
        this.draw();
        this.texturas = this.texturasGenerator.load(this.mapaData.texturas, Menu);
        this.trees = new TreeGenerator(this.texturas.arbol, this.context);

        this.engine.createObjects(this.mapaArray);
      });
  }
  getSizeMap() {
    this.sizeMap = 0;
    this.mapaArray.forEach((element) => {
      if (element.length > this.sizeMap) {
        this.sizeMap = element.length;
      }
    });
  }
  draw() {
    if (this.texturasGenerator.complete == false) {
      return;
    }
    this.getSizeMap();
    this.context.drawImage(
      this.texturas.scene.Layout,
      -this.canvasPosition.x,
      -this.canvasPosition.y,
      this.canvas.width,
      650
    );

    for (let fila = 0; fila < this.mapaArray.length; fila++) {
      for (let columna = 0; columna < this.sizeMap; columna += 1) {
        let mapaLetra = this.mapaArray[fila][columna];
        let posicion = { x: columna, y: fila };

        this.letterToTexture(mapaLetra, posicion);
        //Trees
        // this.trees.selectTrees(mapaLetra, posicion);
        //Boxes
      }
    }
  }
  limpiar() {
    this.canvas.width = this.canvas.width;
    this.context.translate(this.canvasPosition.x, this.canvasPosition.y);
  }
}
