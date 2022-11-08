let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

class Car {
  constructor(marca, year) {
    //Atributos
    this.color = "rojo";
    this.marca = marca;
    this.velocidad = "20 m/s";
    this.year = year;
  }
  Acelerar() {
    console.log("Estoy acelerando");
  }
  Frenar() {
    console.log("Estoy frenando");
  }
  EscibrirVelocidad() {
    context.fillStyle = "#FFFFFF";
    // context.fillText(this.year, 150, 150);
    console.log(this);
  }
}

class Camioneta extends Car {
  constructor() {
    super();
  }
  EscibrirVelocidad() {
    context.fillStyle = "#FFFFFF";
    context.fillText(`${this.marca} va a ${this.velocidad}`, 0, 150);
  }
}
var MiCarro = new Car("Ford", 12);
var MiSegundoCarro = new Car("Toyota", 5);
var Micamioneta = new Camioneta();

console.log(MiCarro);
MiCarro.Acelerar();

MiCarro.EscibrirVelocidad();
MiSegundoCarro.EscibrirVelocidad();
// Micamioneta.EscibrirVelocidad();
