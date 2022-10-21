class Mapa {
  constructor(engine) {
    this.canvas = document.getElementById("Game-ViewPort");
    this.context = this.canvas.getContext("2d");
    this.canvasPosition = {
      x: 500,
      y: 0,
    };
    this.realCanvasPosition = {
      x: 0,
      y: 0,
    };
    this.engine = engine;
    this.zonas = ["Laboratory", "Forest", "Graveyard"];
    this.status = {
      Laboratory: false,
      Forest: false,
      Graveyard: false,
    };
    this.scenes = {
      Laboratory: null,
      Forest: null,
      Graveyard: null,
    };
    this.totalMap = [];
  }
  finalizarCarga(name) {
    this.status[name] = true;
    let Loaded = true;
    for (const sceneGame in this.status) {
      if (this.status[sceneGame] == false) {
        Loaded = false;
      }
    }
    if (Loaded == true) {
      this.loadNewZone();
      this.Menu.finalizarCarga();
      this.engine.createObjects(this.totalMap);
      console.log("Map added ✔");
    } else {
      this.loadNewZone();
    }
  }
  loadScene(name) {
    fetch(`MapData/${name}/${name}.json`)
      .then((response) => {
        return response.json();
      })
      .then((rawJson) => {
        //Accedo a la data del mapa
        let mapData = rawJson;

        //Obtengo el array del mapa
        let mapArray = mapData.Mapa.map((elemento) => {
          return elemento.join().split("");
        });

        // this.cargarTexuras();
        let ambientSound = new Audio(mapData.sound.ambiente);
        let texturasGenerator = new Textures();

        let texturas = texturasGenerator.load(mapData.texturas, this, name);

        let xPosition = this.getSizeMap();
        this.addArrToTotal(this.verifyArr(mapArray));
        this.scenes[name] = new Escena(
          xPosition,
          texturas,
          mapArray,
          ambientSound,
          mapData.configsObjects
        );
        console.log(`Scene ${name} added ✔`);
        this.engine.addBox(this.scenes[name].boxes);
        this.engine.addEnemy(this.scenes[name].enemys);
      });
  }
  addArrToTotal(newArray) {
    let newArr = [];
    for (let columna = 0; columna < 20; columna++) {
      let fila = [];
      if (this.totalMap[columna] == undefined) {
        fila = newArray[columna];
      } else {
        fila = this.totalMap[columna].concat(newArray[columna]);
      }
      newArr.push(fila);
    }
    this.totalMap = newArr;
  }
  verifyArr(newArray = []) {
    let max = this.getSize(newArray);
    let arrCopy = newArray;
    for (let fila = 0; fila < 20; fila++) {
      if (newArray[fila] == undefined) {
        newArray[fila] = [];
      }
      let length = newArray[fila].length;
      let difference = max - length;
      if (difference != 0) {
        let spaces = " ".repeat(difference).split("");
        arrCopy[fila] = newArray[fila].concat(spaces);
      }
    }
    return arrCopy;
  }
  mover(vel) {
    this.canvasPosition.x -= vel;
    this.realCanvasPosition.x -= vel;
  }
  movimientoY(posicionY) {
    this.canvasPosition.y = -posicionY + 300;
    this.realCanvasPosition.y = -posicionY + 300;
  }
  loadNewZone() {
    if (this.status.Laboratory == false) {
      this.loadScene("Laboratory");
      return;
    }
    if (this.status.Forest == false) {
      this.loadScene("Forest");
      return;
    }
    if (this.status.Graveyard == false) {
      this.loadScene("Graveyard");
      return;
    }
    console.log("Maps loaded");
  }
  cargarZona(Menu) {
    this.correctStatus = false;
    this.Menu = Menu;
    this.loadNewZone();
  }
  getSizeMap() {
    let sizeMap = 0;
    this.totalMap.forEach((element) => {
      if (element != undefined) {
        if (element.length > sizeMap) {
          sizeMap = element.length;
        }
      }
    });
    return sizeMap;
  }
  getSize(newArr) {
    let sizeMap = 0;
    newArr.forEach((element) => {
      if (element != undefined) {
        if (element.length > sizeMap) {
          sizeMap = element.length;
        }
      }
    });
    return sizeMap;
  }

  draw() {
    this.getSizeMap();

    this.scenes.Laboratory.draw(this.context, this.canvasPosition);
    this.scenes.Forest.draw(this.context, this.canvasPosition);
    this.scenes.Graveyard.draw(this.context, this.canvasPosition);
  }
  limpiar() {
    this.canvas.width = this.canvas.width;
    this.context.translate(this.canvasPosition.x, this.canvasPosition.y);
  }
}
