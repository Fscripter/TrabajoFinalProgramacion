function trunc(x, posiciones = 0) {
  var s = x.toString();
  var l = s.length;
  var decimalLength = s.indexOf(".") + 1;
  var numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
}

class Fisica {
  constructor(objects) {
    this.gravedad = 10;
    this.objets = objects;
    this.deltaTime = 60 / 1000;
    this.objectsInScreen = [];
    this.enemys = [];
  }
  aplicarGravedad(mapArray) {
    this.mapArray = mapArray;

    this.objets.forEach((element) => {
      if (element instanceof Player) {
        this.mainPlayer = element;
      }
      if (element.positionWorld.y > this.mapArray.length * 50) {
        let IDtoDelte = element.delete();
        let idDeleted = undefined;
        this.enemys.forEach((enemy, index) => {
          if (enemy.id == IDtoDelte) {
            idDeleted = index;
          }
        });
        this.enemys.splice(idDeleted, 1);
        return;
      }
      if (!element.physicsData.isGround) {
        element.velocidad.y += trunc(this.gravedad * this.deltaTime * this.deltaTime * 10, 5);
        if (element.velocidad.y >= 0) {
          element.stateData.jumping = false;
        }
      } else {
        element.velocidad.y = 0;
        element.stateData.jumping = false;
      }
      //Realiza movimiento
      element.positionWorld.y += Math.floor(element.velocidad.y);
      this.detectGround(element);
      // this.detectarColision(element);
    });
  }
  detectarTerreno(terreno) {
    if (terreno == "T" || terreno == "I" || terreno == "D") {
      return true;
    }
  }
  detectGround(element) {
    //Only detect ground if we are falling
    if (element.stateData.jumping) {
      return;
    }
    let positionArr = {
      y: Math.floor((element.positionWorld.y + element.size.h) / 50),
      xa: Math.floor(element.positionWorld.x / 50),
      xb: Math.floor((element.positionWorld.x + element.size.w) / 50),
    };
    let isFloor = false;
    let axisX = this.mapArray[positionArr.y][positionArr.xa];
    let axisXWidth = this.mapArray[positionArr.y][positionArr.xb];

    isFloor = this.detectarTerreno(axisX) || this.detectarTerreno(axisXWidth);
    element.physicsData.isGround = isFloor;
    if (isFloor) {
      element.positionWorld.y = positionArr.y * 50 - element.size.h;
    }
  }
  detectarColision(element) {
    let posicionEnArray = {
      y: Math.floor((element.posicion.y + element.size.h) / 50) - 1,
      xa: Math.floor(element.posicion.x / 50),
      xb: Math.floor((element.posicion.x + element.size.w / 5) / 50),
    };
    let primerTerreno = this.mapArray[posicionEnArray.y][posicionEnArray.xa];
    let segundoTerreno = this.mapArray[posicionEnArray.y][posicionEnArray.xa + 1];

    let canMove = {
      l: !this.detectarTerreno(primerTerreno),
      r: !this.detectarTerreno(segundoTerreno),
    };
    element.move = canMove;
  }
  reduccionEnemigosCanvas(canvasPosicion, queue) {
    this.objectsInScreen = [];
    this.objets.forEach((element) => {
      if (!(element instanceof Enemy)) {
        return;
      }
      if (
        element.positionWorld.x > -canvasPosicion.x &&
        element.positionWorld.x < -canvasPosicion.x + 1000
      ) {
        queue.add(element);
        element.active = true;
        this.objectsInScreen.push(element);
      } else {
        element.active = false;
      }
    });
    this.enemigosEnPantalla();
  }
  enemigosEnPantalla() {
    //Buscar balas
    if (this.objectsInScreen.length < 0) return;
    this.enemys = [];
    this.objectsInScreen.forEach((element) => {
      if (element instanceof Enemy) {
        this.enemys.push(element);
      }
      if (element instanceof Player) {
        this.mainPlayer = element;
      }
    });
  }
  enemigoDetectarJugador() {
    this.enemys.forEach((enemigos) => {
      enemigos.IA(
        {
          life: this.mainPlayer.life,
          ammount: this.mainPlayer.ammo,
          positionWorld: this.mainPlayer.positionWorld,
        },
        null,
        this.mainPlayer.bullets
      );
    });
  }
}
