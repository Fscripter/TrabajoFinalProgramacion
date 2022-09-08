class Fisica {
  constructor(objects, mapArray) {
    this.gravedad = 10;
    this.objets = objects;
    this.deltaTime = 60 / 1000;
    this.objectsInScreen = [];
  }
  aplicarGravedad(mapArray, canvasPosicion) {
    this.mapArray = mapArray;
    this.objets.forEach((element, index) => {
      if (!element.isGround) {
        element.velocidad.y += this.gravedad * this.deltaTime * this.deltaTime * 10;
      } else {
        element.velocidad.y = 0;
      }
      //Realiza movimiento
      element.posicion.y += element.velocidad.y;
      this.detectarSuelo(element);
      this.reduccionEnemigosCanvas(canvasPosicion);
    });
    this.colisionBalas();
  }
  detectarSuelo(element) {
    let cuadrantePosicion = {
      x: Math.floor(element.posicion.x / element.size.w),
      y: Math.ceil(element.posicion.y / 50),
    };
    if (
      this.mapArray[cuadrantePosicion.y][cuadrantePosicion.x] == "T" ||
      this.mapArray[cuadrantePosicion.y][cuadrantePosicion.x] == "L" ||
      this.mapArray[cuadrantePosicion.y][cuadrantePosicion.x] == "D"
    ) {
      element.isGround = true;
    } else {
      element.isGround = false;
    }
    this.detectarColision(element);
  }
  detectarColision(element) {
    let cuadrantePosicion = {
      x: Math.floor(element.posicion.x / element.size.w),
      y: Math.ceil(element.posicion.y / 50),
    };
    let triggerDerecha = this.mapArray[cuadrantePosicion.y - 1][cuadrantePosicion.x + 1];
    let triggerIzquierda = this.mapArray[cuadrantePosicion.y - 1][cuadrantePosicion.x - 2];
    if (
      triggerDerecha == "T" ||
      triggerDerecha == "L" ||
      triggerIzquierda == "T" ||
      triggerIzquierda == "L"
    ) {
      element.salto();
    }
  }
  reduccionEnemigosCanvas(canvasPosicion) {
    this.objectsInScreen = [];
    this.objets.forEach((element) => {
      if (element.posicion.x > -canvasPosicion.x && element.posicion.x < -canvasPosicion.x + 1000) {
        if (element.tag == "Enemigo") {
          element.show();
        }
        this.objectsInScreen.push(element);
      } else {
        if (element.tag == "Enemigo") {
          element.hide();
        }
      }
    });
  }
  colisionBalas() {
    if (this.objectsInScreen.length < 0) return;

    let mainPlayer;
    let enemys = [];
    //Buscar balas
    this.objectsInScreen.forEach((element) => {
      if (element.tag == "Player") {
        mainPlayer = element;
      } else {
        enemys.push(element);
      }
    });

    //Cada bala del jugador interactuara con el enemigo

    if (mainPlayer.bulletsArray.length > 0) {
      mainPlayer.bulletsArray.forEach((bala) => {
        console.log(bala.posicion);
        console.log(enemys);
        // posicion de cada bala
        enemys.forEach((enemigo) => {
          if (
            bala.posicion.x >= enemigo.posicion.x &&
            bala.posicion.x < enemigo.posicion.x + enemigo.size.w &&
            bala.posicion.y >= enemigo.posicion.y &&
            bala.posicion.y < enemigo.posicion.y + enemigo.size.h
          ) {
            bala.eliminar();
            enemigo.recibirDano();
          }
        });
      });
    }
  }
}
