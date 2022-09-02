class Player
{
    #radio;
    #xCentro;
    #yCentro;
    #colorRelleno;
    #colorContorno;


    constructor (radioIncial, xInicial, yInicial, contorno, relleno)
    {

        this.#radio = radioIncial;
        this.#xCentro = xInicial;
        this.#yCentro = yInicial;
        this.#colorContorno = contorno;
        this.#colorRelleno = relleno;
        this.imgBase = new Image();
        this.imgBase.src="./Sprites/Player/base.jpg";

    }

    dibujar (ctx)
    {
        // ctx.beginPath();
        ctx.drawImage(this.imgBase,this.#xCentro, this.#yCentro);
        // ctx.arc(this.#xCentro,this.#yCentro,this.#radio,0, 2.0 * Math.PI);
        // ctx.fillStyle = this.#colorRelleno;
        // ctx.fill();
        // ctx.strokeStyle = this.#colorContorno;
        // ctx.stroke();
        // ctx.closePath();c
    }

    moverArriba ()
    {
        this.#yCentro += - 10;
    }

    moverAbajo ()
    {
        this.#yCentro += 10;
    }
    moverIzquierda ()
    {
        this.#xCentro += - 10;
    }

    moverDerecha ()
    {
        this.#xCentro += 10;
    }

    
}