class gameObject {
  constructor(tag, puntoAparicion, animaciones) {
    this.tag = tag;
    this.posicion = {
      x: puntoAparicion.x,
      y: puntoAparicion.y,
    };
    this.puntoReaparicion = puntoAparicion;
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
    this.move = {
      l: true,
      r: true,
    };
    this.bulletsArray = [];
    this.canIshoot = true;

    this.caminar = false;
    this.saltando = false;

    this.orientacion = "L"; // Orientacion D: Derecha, L: Izquierda

    this.deltaTime = 60 / 1000;
    this.animacion = new Animaciones(animaciones, this.orientacion, this);
  }
  cambiarOrientacion(dir) {
    if (dir >= 0) {
      this.orientacion = "D";
      this.animacion.cambiarOrientacion(this.orientacion);
      return;
    }
    this.orientacion = "L";
    this.animacion.cambiarOrientacion(this.orientacion);
  }
  destroyBullet() {
    this.bulletsArray.shift();
  }
  disparar(orientacion = "D", coolDown) {
    if (this.canIshoot) {
      this.bulletsArray.push(
        new Bala(this.posicion.x, this.posicion.y + 25, orientacion, this.bulletsArray, this.size.w)
      );
      this.canIshoot = false;
      this.idDispararIntervalo = setTimeout(() => {
        this.canIshoot = true;
      }, coolDown);
    }
  }
  dibujar(ctx) {
    if (this.dev) {
      ctx.strokeStyle = "#00FF00";
      ctx.strokeRect(this.posicion.x, this.posicion.y, this.size.w, this.size.h);
      ctx.arc(this.posicion.x, this.posicion.y, 10, 0, Math.PI * 2);
    }
    ctx.drawImage(
      this.animacion.dibujar(),
      this.posicion.x,
      this.posicion.y,
      this.size.w,
      this.size.h
    );

    this.bulletsArray.forEach((element) => {
      element.dibujar(ctx);
      element.move();
    });
  }
  mover(vel) {
    if (vel >= 0) {
      if (this.move.r) {
        this.posicion.x += vel;
      }
    } else {
      if (this.move.l) {
        this.posicion.x += vel;
      }
    }
    this.cambiarOrientacion(vel);
  }
  salto() {
    if (this.isGround) {
      this.velocidad.y = -this.fuerzaSalto;
      this.saltando = true;
      this.isGround = false;
      this.cambiarEstado();
    }
  }
}
