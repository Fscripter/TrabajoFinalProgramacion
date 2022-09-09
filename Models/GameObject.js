class ImagenDerogada extends Image {
  constructor(url) {
    super();
    this.src = url;
  }
}
const animacionesUrl = {
  base: {
    derecha: new ImagenDerogada(),
    izquierda: new ImagenDerogada(),
    loop: true,
    timeTransition: 0,
    maxFrame: 0,
  },
  caminar: {
    derecha: [],
    izquierda: [],
    loop: true,
    timeTransition: 0,
    maxFrame: 0,
  },
  saltar: {
    derecha: [],
    izquierda: [],
    loop: true,
    timeTransition: 0,
    maxFrame: 0,
  },
};

class gameObject {
  constructor(tag, puntoAparicion, animaciones = animacionesUrl) {
    this.tag = tag;
    this.posicion = {
      x: puntoAparicion.x,
      y: puntoAparicion.y,
    };
    this.puntoReaparicion = puntoAparicion;
    this.animaciones = animaciones;
    this.size = {
      w: 50,
      h: 100,
    };
    this.velocidad = {
      x: 0,
      y: 0,
    };
    this.fuerzaSalto = 10;
    this.isGround = false; //Variable para saber si esta tocando el suelo
    this.bulletsArray = [];
    this.canIshoot = true;

    this.orientacion = "D"; // Orientacion D: Derecha, L: Izquierda
    this.estado = "Estatico"; // Estatico, caminando, saltando
    this.animacionFrameObj = {
      animacionFrame: 0,
      loop: false,
      maxFrame: 0,
      timeTransition: 0,
      endAnimation: false,
    };
    this.saltando = false;
    this.caminando = false;
    this.gameObjectImg = new Image(); //Imagen del objeto a renderizar
    this.deltaTime = 60 / 1000;
    this.time = 0;
  }
  cambiarOrientacion(dir) {
    if (dir >= 0) {
      this.orientacion = "D";
      return;
    }
    this.orientacion = "L";
  }
  destroyBullet() {
    this.bulletsArray.shift();
  }
  disparar(orientacion = "D") {
    if (this.canIshoot) {
      this.bulletsArray.push(
        new Bala(this.posicion.x, this.posicion.y + 25, orientacion, this.bulletsArray, this.size.w)
      );
      this.canIshoot = false;
      setTimeout(() => {
        this.canIshoot = true;
      }, 150);
    }
  }
  configurarAnimation(loop, maxFrame, timeTransition) {
    this.animacionFrameObj.loop = loop;
    this.animacionFrameObj.maxFrame = maxFrame;
    this.animacionFrameObj.timeTransition = timeTransition;
    this.animacionFrameObj.endAnimation = false;
    this.animacionFrameObj.animacionFrame = 0;
    console.log("Pase de un estado a otro");
  }
  configurarAnimacionFrame() {
    if (this.estado == "Caminando") {
      this.configurarAnimation(
        this.animaciones.caminar.loop,
        this.animaciones.caminar.maxFrame,
        this.animaciones.caminar.timeTransition
      );
      return;
    }
    if (this.estado == "Saltando") {
      this.configurarAnimation(
        this.animaciones.saltar.loop,
        this.animaciones.saltar.maxFrame,
        this.animaciones.saltar.timeTransition
      );
      return;
    }
    if (this.estado == "Estatico") {
      this.configurarAnimation(
        this.animaciones.base.loop,
        this.animaciones.base.maxFrame,
        this.animaciones.base.timeTransition
      );
    }
  }
  resetearAnimacionFrame() {
    this.time = 0;
    this.configurarAnimacionFrame();
  }
  aumentarAnimacionFrame() {
    this.time += 1;
    if (this.animacionFrameObj.loop) {
      if (this.time > this.animacionFrameObj.timeTransition) {
        if (this.animacionFrameObj.animacionFrame > this.animacionFrameObj.maxFrame) {
          this.animacionFrameObj.animacionFrame = 0;
        } else {
          this.animacionFrameObj.animacionFrame += 1;
        }
        this.time = 0;
      }
      if (this.animacionFrame > this.animacionFrameObj.maxFrame) {
        this.animacionFrameObj.animacionFrame = 0;
      }
    } else {
      //No estoy en un loop
      if (this.time > this.animacionFrameObj.timeTransition) {
        if (this.animacionFrameObj.animacionFrame < this.animacionFrameObj.maxFrame) {
          this.animacionFrameObj.animacionFrame += 1;
        }
        this.time = 0;
      }
    }
  }
  dibujarAnimacionFrame() {
    switch (this.estado) {
      case "Estatico":
        if (this.orientacion == "D") {
          this.gameObjectImg = this.animaciones.base.derecha;
        } else {
          this.gameObjectImg = this.animaciones.base.izquierda;
        }
        break;
      case "Caminando":
        if (this.orientacion == "D") {
          this.gameObjectImg =
            this.animaciones.caminar.derecha[this.animacionFrameObj.animacionFrame];
        } else {
          this.gameObjectImg =
            this.animaciones.caminar.izquierda[this.animacionFrameObj.animacionFrame];
        }
        break;
      case "Saltando":
        if (this.orientacion == "D") {
          this.gameObjectImg =
            this.animaciones.saltar.derecha[this.animacionFrameObj.animacionFrame];
        } else {
          this.gameObjectImg =
            this.animaciones.saltar.izquierda[this.animacionFrameObj.animacionFrame];
        }
        break;
      case "Cayendo":
        if (this.orientacion == "D") {
          this.gameObjectImg = this.animaciones.caer.derecha;
        } else {
          this.gameObjectImg = this.animaciones.caer.izquierda;
        }
        break;
      default:
        this.gameObjectImg = this.animaciones.base.derecha;
        break;
    }
  }
  cambiarEstado() {
    if (this.caminando && this.isGround) {
      if (this.estado == "Caminando") {
        this.aumentarAnimacionFrame();
      } else {
        this.estado = "Caminando";
        this.resetearAnimacionFrame();
      }
      this.estado = "Caminando";
      return;
    }
    if (this.saltando && !this.isGround) {
      if (this.estado == "Saltando") {
        this.aumentarAnimacionFrame();
      } else {
        this.estado = "Saltando";
        this.resetearAnimacionFrame();
      }
      this.estado = "Saltando";
      return;
    }
    if (!this.isGround && !this.saltando) {
      if (this.estado == "Cayendo") {
        this.aumentarAnimacionFrame();
      } else {
        this.estado = "Cayendo";
        this.resetearAnimacionFrame();
      }
      this.estado = "Cayendo";
      return;
    }
    if (this.estado == "Estatico") {
      return;
    }
    this.estado = "Estatico";
    this.resetearAnimacionFrame();
    return;
  }
  revisarEstado() {
    //Devolver a estatico si se necesita
    this.cambiarEstado();
  }
  dibujar(ctx) {
    this.revisarEstado();
    this.dibujarAnimacionFrame();

    ctx.drawImage(this.gameObjectImg, this.posicion.x, this.posicion.y, this.size.w, this.size.h);

    this.bulletsArray.forEach((element) => {
      element.dibujar(ctx);
      element.move();
    });
  }
  mover(vel) {
    this.posicion.x += vel;
    this.cambiarOrientacion(vel);
  }
  salto() {
    if (this.isGround) {
      this.velocidad.y = -this.fuerzaSalto;
      this.saltando = true;
      this.cambiarEstado();
      this.isGround = false;
    }
  }
}
