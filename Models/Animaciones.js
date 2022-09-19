const animacionUrls = {
  derecha: [],
  izquierda: [],
};

class ImagenDerogada extends Image {
  constructor(url) {
    super();
    this.src = url;
  }
}

const Initialsettings = {
  frame: 0,
  state: ["Estatico", "Caminando"], //n states, n animaciones
  animaciones: [
    {
      loop: false,
      velocidad: 0,
      animacion: animacionUrls,
    },
  ],
};

class Animaciones {
  constructor(settings = Initialsettings, orientation) {
    this.animacionEstados = settings.state;
    this.frame = 0;
    this.time = 0;
    this.settings = settings;
    this.animacion = {
      loop: false,
      velocidad: 0,
      animaciones: {
        derecha: [],
        izquierda: [],
      },
    };
    this.orientation = orientation;
    this.state = "Estatico";
    this.spriteToRender = new Image();
    this.spriteToRender.src = "./Sprites/Player/Derecha.png";
  }
  obtenerEstadoDeMovimiento(isGround, Moviendose, Saltando) {
    this.isGround = isGround;
    this.Moviendose = Moviendose;
    this.Saltando = Saltando;

    this.recibirEvento();
  }
  recibirEvento() {
    if (this.Saltando && !this.isGround) {
      this.validarEstado("Saltando");
      this.state = "Saltando";
      return;
    }
    if (!this.Saltando && !this.isGround) {
      this.validarEstado("Cayendo");
      this.state = "Cayendo";
      return;
    }
    if (this.Moviendose && this.isGround) {
      this.validarEstado("Caminando");
      this.state = "Caminando";
      return;
    }

    this.state = "Estatico";
    this.validarEstado("Estatico");
    return;
  }
  obtenerInfoAnimacion(obj) {
    this.animacion = obj;
  }
  validarEstado(state) {
    if (this.state == state) {
      let index = this.settings.state.indexOf(this.state);
      let isIn = index != -1;
      if (isIn) {
        this.obtenerInfoAnimacion(this.settings.animaciones[index]);
      } else {
        this.obtenerInfoAnimacion(this.settings.animaciones[0]);
      }
    }
  }
  actualizarFrames() {
    if (this.animacion.loop == true) {
      //Rutina de incrementar frames
      this.time++;
      if (this.time > this.animacion.velocidad) {
        this.frame++;
        if (this.frame > this.animacion.animaciones.derecha.length - 1) {
          this.frame = 0;
        }
        this.time = 0;
      }

      //Derecha o izquierda
      if (this.orientation == "D") {
        this.spriteToRender = this.animacion.animaciones.derecha[this.frame];
        return;
      }
      this.spriteToRender = this.animacion.animaciones.izquierda[this.frame];
      return;
    } else {
      //Rutina dejar la imagen por defecto
      if (this.orientation == "D") {
        this.spriteToRender = this.animacion.animaciones.derecha[0];
      } else {
        this.spriteToRender = this.animacion.animaciones.izquierda[0];
      }
    }
  }
  dibujar() {
    console.log(this.state);
    this.actualizarFrames();
    return this.spriteToRender;
  }
  cambiarOrientacion(newOrientacion) {
    this.orientation = newOrientacion;
  }
}
