class ImagenDerogada extends Image {
  constructor(url) {
    super(0, 0);
    this.src = url;
    return this;
  }
}

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d", { alpha: false });

let virtualCanvas = document.createElement("canvas");
let virtualContext = virtualCanvas.getContext("2d", { alpha: false });
let img = new ImagenDerogada("../../Sprites/Enemys/Pirata/Pirata-Moving.png");

let range = [1, 10, 100, 1000, 10000, 100000, 1000000];
img.onload = () => {
  range.map((maxPictures) => {
    var startNormal = window.performance.now();
    for (let nPictures = 0; nPictures < maxPictures; nPictures++) {
      context.drawImage(img, nPictures * 10, 0);
    }
    var endNormal = window.performance.now();
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    var startVirtual = window.performance.now();
    for (let nPictures = 0; nPictures < maxPictures; nPictures++) {
      virtualContext.drawImage(img, nPictures * 10, 0);
    }
    context.drawImage(virtualCanvas, 0, 0);
    var endVirtual = window.performance.now();
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);

    console.log(
      `X:${maxPictures},Y: ${endNormal - startNormal};X:${maxPictures},Y:${
        endVirtual - startVirtual
      }`
    );
  });
};
