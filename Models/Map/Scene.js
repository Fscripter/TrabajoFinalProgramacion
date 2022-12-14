class Escena {
  constructor(xPosicion, textures, mapArr, configs = {}) {
    this.textures = textures;
    this.xPosicion = xPosicion;
    this.mapArr = mapArr;
    this.configs = configs;
    this.boxes = [];
    this.enemys = [];
    this.Decorations = [];
    this.ligths = [];
    this.createObjects();
  }
  createDecorations(letter, position) {
    if (letter in this.configs) {
      let positionWorld = position;
      positionWorld.x *= 50;
      positionWorld.y *= 50;
      switch (letter) {
        case "A":
          this.Decorations.push(
            new ObjectsMap(
              positionWorld,
              this.configs[letter].size,
              this.textures.Decorations[letter].src
            )
          );
          break;
        default:
          break;
      }
    }
  }
  createEnemy(letter, position) {
    let positionWorld = position;
    positionWorld.x *= 50;
    positionWorld.x += this.xPosicion * 50;
    positionWorld.y *= 50;
    if (letter == "0") {
      this.enemys.push(new Footlight(positionWorld, 2));
    }
    if (letter == "1") {
      this.enemys.push(new Ghost(positionWorld, 2));
    }
  }
  createBox(letter, position) {
    if (letter in this.configs) {
      let positionWorld = position;
      positionWorld.x *= 50;
      positionWorld.y *= 50;
      switch (letter) {
        case "T":
          this.boxes.push(
            new TNT(positionWorld, this.configs[letter].size, this.textures.Objects[letter].src)
          );
          this.ligths.push(
            new GameObject(
              {
                x: position.x - 155,
                y: position.y + 150,
              },
              {
                h: 250,
                w: 350,
              },
              "./MapData/Laboratory/Objects/Box/TNT/TNTMip.png"
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
          this.ligths.push(
            new GameObject(
              {
                x: position.x - 155,
                y: position.y + 150,
              },
              {
                h: 250,
                w: 350,
              },
              "./MapData/Laboratory/Objects/Box/Heal/HealMip.png"
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
          this.ligths.push(
            new GameObject(
              {
                x: position.x - 155,
                y: position.y + 150,
              },
              {
                h: 250,
                w: 350,
              },
              "./MapData/Laboratory/Objects/Box/Heal/HealMip.png"
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
          this.ligths.push(
            new GameObject(
              {
                x: position.x - 155,
                y: position.y + 150,
              },
              {
                h: 250,
                w: 350,
              },
              "./MapData/Laboratory/Objects/Box/Flamethrower/FlamethrowerMip.png"
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
          this.ligths.push(
            new GameObject(
              {
                x: position.x - 155,
                y: position.y + 150,
              },
              {
                h: 250,
                w: 350,
              },
              "./MapData/Laboratory/Objects/Box/Laser/LaserMip.png"
            )
          );
          break;
        case "B":
          this.boxes.push(
            new boxAmmo(positionWorld, this.configs[letter].size, this.textures.Objects[letter].src)
          );
          this.ligths.push(
            new GameObject(positionWorld, this.configs[letter].size, "./MapData/MipMapTnT.png")
          );
          break;
        default:
          break;
      }
    }
  }
  createObjects() {
    for (let fila = 0; fila < this.mapArr.length; fila++) {
      let size = this.mapArr[fila].length;
      for (let columna = 0; columna < size; columna += 1) {
        let mapaLetra = this.mapArr[fila][columna];
        let posicion = { x: columna, y: fila };
        this.createBox(mapaLetra, posicion);
        this.createEnemy(mapaLetra, posicion);
        this.createDecorations(mapaLetra, posicion);
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
    this.Decorations.forEach((decoration) => {
      decoration.draw(context);
    });
    this.enemys.forEach((enemy) => {
      enemy.draw(context);
    });
  }
  letterToTexture(textura, posicion, context) {
    let allowedTextures = ["D", "C", "L", "R", "X", "Z", "V", "M", "N"];
    if (allowedTextures.indexOf(textura) == -1) {
      return;
    }
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
