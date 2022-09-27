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
      if (!element.isGround) {
        element.velocidad.y += trunc(this.gravedad * this.deltaTime * this.deltaTime * 10, 5);
        if (element.velocidad.y >= 0) {
          element.saltando = false;
        }
      } else {
        element.velocidad.y = 0;
        element.saltando = false;
      }
      //Realiza movimiento
      element.positionWorld.y += Math.floor(element.velocidad.y);
      this.detectarSuelo(element);
      // this.detectarColision(element);
    });
  }
  detectarTerreno(terreno) {
    if (terreno == "T" || terreno == "I" || terreno == "D") {
      return true;
    }
  }
  detectarSuelo(element) {
    let posicionEnArray = {
      y: Math.floor((element.positionWorld.y + element.size.h) / 50),
      xa: Math.floor(element.positionWorld.x / 50),
      xb: Math.floor((element.positionWorld.x + element.size.w) / 50),
    };

    let hayTerrenoDebajo = false;

    let primerTerreno = this.mapArray[posicionEnArray.y][posicionEnArray.xa];
    let segundoTerreno = this.mapArray[posicionEnArray.y][posicionEnArray.xb];

    hayTerrenoDebajo = this.detectarTerreno(primerTerreno) || this.detectarTerreno(segundoTerreno);

    element.isGround = hayTerrenoDebajo;
    if (hayTerrenoDebajo) {
      element.positionWorld.y = posicionEnArray.y * 50 - element.size.h;
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
      if (element.posicion.x > -canvasPosicion.x && element.posicion.x < -canvasPosicion.x + 1000) {
        if (element.tag == "Enemigo" && element.alive) {
          queue.add(element);
          element.show();
        }
        this.objectsInScreen.push(element);
      } else {
        if (element.tag == "Enemigo") {
          element.hide();
        }
      }
    });
    this.enemigosEnPantalla();
  }
  enemigosEnPantalla() {
    //Buscar balas
    if (this.objectsInScreen.length < 0) return;
    this.enemys = [];
    this.objectsInScreen.forEach((element) => {
      if (element.tag == "Enemigo") {
        this.enemys.push(element);
      }
      if (element.tag == "Player") {
        this.mainPlayer = element;
      }
    });
  }
  enemigoDetectarJugador(mapaCanvas) {
    this.enemys.forEach((enemigos) => {
      enemigos.vision(this.mainPlayer.posicion);
    });
  }
  colisionBalasEnemigos() {
    if (this.objectsInScreen.length < 0) return;
    this.balasEnemigas = [];
    this.enemys.forEach((enemigo) => {
      if (enemigo.bulletsInGame.length > 0) {
        this.balasEnemigas = this.balasEnemigas.concat(enemigo.bulletsInGame);
      }
    });
    if (this.balasEnemigas.length > 0) {
      this.balasEnemigas.forEach((bala) => {
        if (
          bala.posicion.x >= this.mainPlayer.posicion.x &&
          bala.posicion.x < this.mainPlayer.posicion.x + this.mainPlayer.size.w &&
          bala.posicion.y >= this.mainPlayer.posicion.y &&
          bala.posicion.y < this.mainPlayer.posicion.y + this.mainPlayer.size.h
        ) {
          bala.eliminar();
          this.mainPlayer.recibirDano();
        }
      });
    }
  }
  colisionBalasJugador() {
    if (this.objectsInScreen.length < 0) return;

    //Cada bala del jugador interactuara con el enemigo
    if (this.mainPlayer.bulletsInGame.length > 0) {
      this.mainPlayer.bulletsInGame.forEach((bala) => {
        // posicion de cada bala
        this.enemys.forEach((enemigo) => {
          if (
            bala.posicion.x >= enemigo.posicion.x &&
            bala.posicion.x < enemigo.posicion.x + enemigo.size.w &&
            bala.posicion.y >= enemigo.posicion.y &&
            bala.posicion.y < enemigo.posicion.y + enemigo.size.h &&
            enemigo.alive
          ) {
            bala.eliminar();
            enemigo.recibirDano();
          }
          if (
            bala.posicion.y >= enemigo.posicion.y &&
            bala.posicion.y < enemigo.posicion.y + enemigo.size.h
          ) {
            enemigo.salto();
          }
        });
      });
    }
  }
}
