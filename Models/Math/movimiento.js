class ImagenDerogada extends Image {
  constructor(url) {
    super(0, 0);
    this.src = url;
    return this;
  }
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let img = new ImagenDerogada("../../Sprites/Enemys/Pirata/Pirata-Moving.png");
var animacion = new Animator({
  states: ["Estatico", "Caminar", "Saltar", "Caer", "Agachar"],
  animations: [
    {
      id: "Estatico",
      transitionTime: 100,
      loop: false,
      animaciones: {
        derecha: [img],
      },
    },
  ],
});
setInterval(() => {
  canvas.width = 1000;
  animacion.skipFrame();
  animacion.draw(context);
}, 200);
img.onload = () => {
  animacion.draw(context);
};
