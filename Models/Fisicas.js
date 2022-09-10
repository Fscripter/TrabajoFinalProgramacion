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
    this.objets.forEach((element, index) => {
      if (!element.isGround) {
        element.velocidad.y += this.gravedad * this.deltaTime * this.deltaTime * 10;
        if (element.velocidad.y >= 0) {
          element.saltando = false;
        }
      } else {
        element.velocidad.y = 0;
        element.saltando = false;
      }
      //Realiza movimiento
      element.posicion.y += element.velocidad.y;
      this.detectarSuelo(element);
    });
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
  reduccionEnemigosCanvas(canvasPosicion, queue) {
    this.objectsInScreen = [];
    this.objets.forEach((element) => {
      if (element.posicion.x > -canvasPosicion.x && element.posicion.x < -canvasPosicion.x + 1000) {
        if (element.tag == "Enemigo") {
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
    this.enemys.forEach((enemigoss) => {
      enemigoss.vision(mapaCanvas, this.mainPlayer.posicion);
    });
  }
  colisionBalasEnemigos() {
    if (this.objectsInScreen.length < 0) return;
    this.balasEnemigas = [];
    this.enemys.forEach((enemigo) => {
      if (enemigo.bulletsArray.length > 0) {
        this.balasEnemigas = this.balasEnemigas.concat(enemigo.bulletsArray);
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
    if (this.mainPlayer.bulletsArray.length > 0) {
      this.mainPlayer.bulletsArray.forEach((bala) => {
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
