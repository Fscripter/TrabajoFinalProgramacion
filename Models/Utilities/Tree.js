class TreeGenerator {
  constructor(texturas, context) {
    this.amount = 0;
    this.trees = {};
    this.texturas = texturas;
    this.context = context;
  }
  randomSize() {
    return (Math.random() * (1 - 0.5) + 0.5).toFixed(2);
  }
  saveTreesInfo(posicion) {
    let Coordenates = `${posicion.x},${posicion.y}`;
    if (Coordenates in this.trees) {
      return this.trees[Coordenates];
    }
    let randomSize = this.randomSize();
    this.trees[Coordenates] = randomSize;
    // console.log(`Tree created with coordenates ${Coordenates} and size is ${randomSize}`);
    this.amount += 1;
    return randomSize;
  }
  drawTrees(image, posicion) {
    let randomSizeTree = this.saveTreesInfo(posicion);
    let worldPosition = {
      x: posicion.x * 50 - (image.width * randomSizeTree) / 2.5,
      y: (posicion.y + 1) * 50 - image.height * randomSizeTree,
    };
    this.context.drawImage(
      image,
      worldPosition.x,
      worldPosition.y,
      image.width * randomSizeTree,
      image.height * randomSizeTree
    );
  }
  selectTrees(value, posicion) {
    let allowedTextures = ["A", "B", "C", "E"];
    if (allowedTextures.indexOf(value) == -1) {
      return;
    }
    if (value == "E") {
      this.drawTrees(this.texturas.D, posicion);
      return;
    }
    this.drawTrees(this.texturas[value], posicion);
  }
}
