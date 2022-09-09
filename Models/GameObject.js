const animacionesUrl = {
  base: {
    derecha: "",
    izquierda: "",
  },
  caminar: {
    derecha: [],
    izquierda: [],
  },
  salto: {
    derecha: [],
    izquierda: [],
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
    this.animacionId = 0;
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
  cambiarEstado(newState) {
    console.log(this.isGround);
    if (newState == "Caminando" && this.isGround) {
      this.estado = newState;
      return;
    }
    if (newState == "Estatico" && this.isGround) {
      this.estado = newState;
      return;
    }
    if (newState == "Saltando" && this.isGround) {
      this.estado = newState;
      return;
    }
  }
  revisarEstado() {
    if (this.isGround) {
      if (this.estado != "Caminando") {
        this.estado = "Estatico";
      }
    }
  }
  dibujar(ctx) {
    this.revisarEstado();

    ctx.drawImage(this.imgBase, this.posicion.x, this.posicion.y, this.size.w, this.size.h);

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
      this.cambiarEstado("Saltando");
      this.isGround = false;
    }
  }
}
