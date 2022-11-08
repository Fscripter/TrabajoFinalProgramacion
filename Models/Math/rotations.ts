let canvas = document.getElementById("canvas") as HTMLCanvasElement;
let context = canvas.getContext("2d", { willReadFrequently: true }) as CanvasRenderingContext2D;

let imageD = new Image(250, 250);
imageD.src = "./Derecha.png";

interface coodernate {
  x: number;
  y: number;
}
interface axis {
  x: boolean;
  y: boolean;
}
function rotateImg(
  img: HTMLImageElement,
  rotation: number,
  emptyBuffer: Uint8ClampedArray,
  existentBuffer: Uint8ClampedArray
) {
  for (let y: number = 0; y < img.height; y++) {
    for (let x: number = 0; x < img.width; x++) {
      //Recorro la imagen
      let position = { x, y };
      let positionCenter = { x: position.x - 125, y: position.y - 125 };
      let infoRotation = GetPositionFromRotation(positionCenter, rotation)._data;
      let positionRotated = {
        x: Math.round(infoRotation[0][0] + 125),
        y: Math.round(infoRotation[1][0] + 125),
      };
      let positionBufferExistent = (position.y * 250 + position.x) * 4;
      let positionBufferEmpty = (positionRotated.y * 250 + positionRotated.x) * 4;

      emptyBuffer[positionBufferEmpty] = 0;
      emptyBuffer[positionBufferEmpty + 1] = 0;
      emptyBuffer[positionBufferEmpty + 2] = 0;
      emptyBuffer[positionBufferEmpty + 3] = 0;

      emptyBuffer[positionBufferEmpty] = existentBuffer[positionBufferExistent];
      emptyBuffer[positionBufferEmpty + 1] = existentBuffer[positionBufferExistent + 1];
      emptyBuffer[positionBufferEmpty + 2] = existentBuffer[positionBufferExistent + 2];
      emptyBuffer[positionBufferEmpty + 3] = existentBuffer[positionBufferExistent + 3];
    }
  }
}
function GetPositionFromRotation(coodernates: coodernate, degrees: number) {
  let radians = (Math.PI * 2 * degrees) / 360;
  let rotationMatrix = [
    [Math.cos(radians), -Math.sin(radians)],
    [Math.sin(radians), Math.cos(radians)],
  ];
  let a = math.multiply(
    math.matrix(rotationMatrix),
    math.matrix([[coodernates.x], [coodernates.y]])
  );
  return a;
}
function getMirrorPosition(coodernates: coodernate, espejo: axis) {
  let x = 1;
  let y = 1;
  if (espejo.x) {
    x = -1;
  }
  if (espejo.y) {
    y = -1;
  }
  let matrixMirror = [
    [x, 0],
    [0, y],
  ];
  let a = math.multiply(math.matrix(matrixMirror), math.matrix([[coodernates.x], [coodernates.y]]));
  return a;
}
function mirrorImg(
  img: HTMLImageElement,
  espejo: axis,
  emptyBuffer: Uint8ClampedArray,
  existentBuffer: Uint8ClampedArray
) {
  for (let y: number = 0; y < img.height; y++) {
    for (let x: number = 0; x < img.width; x++) {
      //Recorro la imagen
      let position = { x, y };
      let positionCenter = { x: position.x - 125, y: position.y - 125 };
      let infoRotation = getMirrorPosition(positionCenter, espejo)._data;
      let positionRotated = {
        x: Math.round(infoRotation[0][0] + 125),
        y: Math.round(infoRotation[1][0] + 125),
      };

      let positionBufferExistent = (position.y * 250 + position.x) * 4;
      let positionBufferEmpty = (positionRotated.y * 250 + positionRotated.x) * 4;

      emptyBuffer[positionBufferEmpty] = 0;
      emptyBuffer[positionBufferEmpty + 1] = 0;
      emptyBuffer[positionBufferEmpty + 2] = 0;
      emptyBuffer[positionBufferEmpty + 3] = 0;

      emptyBuffer[positionBufferEmpty] = existentBuffer[positionBufferExistent];
      emptyBuffer[positionBufferEmpty + 1] = existentBuffer[positionBufferExistent + 1];
      emptyBuffer[positionBufferEmpty + 2] = existentBuffer[positionBufferExistent + 2];
      emptyBuffer[positionBufferEmpty + 3] = existentBuffer[positionBufferExistent + 3];
    }
  }
}
function LinearImg(img: HTMLImageElement, rotacion = 0, espejo: null | axis, space: number) {
  let emptyBuffer = new Uint8ClampedArray(img.width * img.height * 4);
  let existentBuffer = context.getImageData(0, 0, 250, 250).data;
  let imageToRender = context.createImageData(img.width, img.height);

  if (rotacion != 0 && rotacion != 360) {
    rotateImg(img, rotacion, emptyBuffer, existentBuffer);
  }
  if (espejo != null) {
    mirrorImg(img, espejo, emptyBuffer, existentBuffer);
  }

  imageToRender.data.set(emptyBuffer);
  context.putImageData(imageToRender, 250 * space, 0);
}
imageD.onload = () => {
  let initialdegree = 0;
  setInterval(() => {
    canvas.width = canvas.width;
    context.drawImage(imageD, 0, 0, 250, 250);
    LinearImg(imageD, initialdegree, null, 1);
    LinearImg(imageD, 0, { x: false, y: true }, 2);
    LinearImg(imageD, 0, { x: true, y: false }, 3);
    initialdegree += 15;
  }, 1000);
};
