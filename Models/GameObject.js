class gameObject {
  constructor(tag, puntoAparicion, animacionesUrl) {
    this.tag = tag;
    this.posicion = {
      x: puntoAparicion.x,
      y: puntoAparicion.y,
    };
    this.puntoReaparicion = puntoAparicion;
    this.animaciones = animacionesUrl;
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

  dibujar(ctx) {
    ctx.drawImage(this.imgBase, this.posicion.x, this.posicion.y, this.size.w, this.size.h);

    this.bulletsArray.forEach((element) => {
      element.dibujar(ctx);
      element.move();
    });
  }
  mover(vel) {
    this.posicion.x += vel;
  }
  salto() {
    if (this.isGround) {
      this.velocidad.y = -this.fuerzaSalto;
      this.isGround = false;
    }
  }
}
