class Escena {
  constructor(xPosicion, textures, mapArr, sound, configs = {}) {
    this.textures = textures;
    this.xPosicion = xPosicion;
    this.mapArr = mapArr;
    this.sound = sound;
    this.configs = configs;
    this.boxes = [];
    this.createObjects();
  }
  createBox(letter, position) {
    if (letter in this.configs) {
      let positionWorld = position;
      positionWorld.x *= 50;
      positionWorld.y *= 50;
      switch (letter) {
        case "T":
          this.boxes.push(
            new TNT(
              positionWorld,
              this.configs[letter].size,
              this.textures.Objects[letter].src
            )
          );
          break;
        case "H":
          this.boxes.push(
            new BoxHealing(
              positionWorld,
              this.configs[letter].size,
              this.textures.Objects[letter].src
            )
          );
          break;
        case "G":
          this.boxes.push(
            new BoxHealing(
              positionWorld,
              this.configs[letter].size,
              this.textures.Objects[letter].src
            )
          );
          break;
        case "F":
          this.boxes.push(
            new Boxflamethrower(
              positionWorld,
              this.configs[letter].size,
              this.textures.Objects[letter].src
            )
          );
          break;
        case "S":
          this.boxes.push(
            new BoxLaser(
              positionWorld,
              this.configs[letter].size,
              this.textures.Objects[letter].src
            )
          );
          break;
        case "B":
          this.boxes.push(
            new boxAmmo(
              positionWorld,
              this.configs[letter].size,
              this.textures.Objects[letter].src
            )
          );
          break;
        default:
          break;
      }
    }
  }
  createObjects() {
    console.log(`creating objects in ${this.xPosicion}...`);
    for (let fila = 0; fila < this.mapArr.length; fila++) {
      let size = this.mapArr[fila].length;
      for (let columna = 0; columna < size; columna += 1) {
        let mapaLetra = this.mapArr[fila][columna];
        let posicion = { x: columna, y: fila };
        this.createBox(mapaLetra, posicion);
      }
    }
  }
  getSizeMap() {
    let sizeMap = 0;
    this.mapArr.forEach((element) => {
      if (element != undefined) {
        if (element.length > sizeMap) {
          sizeMap = element.length;
        }
      }
    });
    return sizeMap;
  }
  draw(context, canvasPosition) {
    context.drawImage(
      this.textures.scene.Layout,
      this.xPosicion * 50,
      -canvasPosition.y,
      50 * this.getSizeMap(),
      650
    );
    // }
    for (let fila = 0; fila < this.mapArr.length; fila++) {
      let size = this.mapArr[fila].length;
      for (let columna = 0; columna < size; columna += 1) {
        let mapaLetra = this.mapArr[fila][columna];
        let posicion = { x: columna, y: fila };
        this.letterToTexture(mapaLetra, posicion, context);
      }
    }
    this.boxes.forEach((box) => {
      box.draw(context);
    });
  }
  letterToTexture(textura, posicion, context) {
    let allowedTextures = ["D", "C", "L", "R", "X", "Z", "V"];
    if (allowedTextures.indexOf(textura) == -1) {
      return;
    }
    // console.log(this.texturas.terreno, textura, this.texturas.terreno[textura]);
    context.drawImage(
      this.textures.terreno[textura],
      this.xPosicion * 50 + posicion.x * 50,
      posicion.y * 50,
      50,
      50
    );
    return;
  }
}
