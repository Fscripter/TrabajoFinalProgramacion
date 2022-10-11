function trunc(x, posiciones = 0) {
  var s = x.toString();
  var l = s.length;
  var decimalLength = s.indexOf(".") + 1;
  var numStr = s.substr(0, decimalLength + posiciones);
  return Number(numStr);
}

class Physic {
  constructor() {
    this.gravity = 10;
    this.deltaTime = 60 / 1000;
  }
  getMap(map) {
    this.map = map;
    console.log("Physics added! ✔");
  }
  onGravity(objects) {
    //Aplicar gravedad a n
    objects.forEach((element) => {
      if (!element.physicsData.isGround) {
        element.velocidad.y += trunc(this.gravity * this.deltaTime * this.deltaTime * 10, 5);
        if (element.velocidad.y >= 0) {
          element.stateData.jumping = false;
        }
      } else {
        element.velocidad.y = 0;
        element.stateData.jumping = false;
      }
      // //Realiza movimiento
      element.positionWorld.y += Math.floor(element.velocidad.y);
      this.detectGround(element);
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
    // console.log(element.positionWorld, element);
    let positionArr = {
      y: Math.floor((element.positionWorld.y + element.size.h) / 50),
      xa: Math.floor(element.positionWorld.x / 50),
      xb: Math.floor((element.positionWorld.x + element.size.w) / 50),
    };

    if (element instanceof Grenade) {
      console.log(element.positionWorld);
    }
    let isFloor = false;
    let axisX = this.map[positionArr.y][positionArr.xa];
    let axisXWidth = this.map[positionArr.y][positionArr.xb];
    isFloor = this.detectarTerreno(axisX) || this.detectarTerreno(axisXWidth);
    element.physicsData.isGround = isFloor;
    if (isFloor) {
      element.positionWorld.y = positionArr.y * 50 - element.size.h;
    }
  }
}
