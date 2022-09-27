class Box extends GameObject {
  constructor(position, size, baseUrl) {
    super(position, size, baseUrl);
  }
  interaction() {
    console.log("Estoy interactuando");
  }
}
