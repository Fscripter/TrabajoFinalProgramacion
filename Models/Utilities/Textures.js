class loadImg {
  constructor(src, callback) {
    this.img = new Image();
    this.img.src = src;
    this.img.onload = () => {
      callback();
    };
    return this.img;
  }
}

class Textures {
  constructor() {
    this.complete = false;
    this.queue = [];
    this.elementLoaded = 0;
  }
  addTextures() {}
  load(textures, Map, name) {
    this.Map = Map;
    this.name = name;
    this.textures = textures;
    this.newTextures = [];
    //Load terrain
    for (const textureObj in textures) {
      this.newTextures[textureObj] = this.loadItem(
        this.textures[textureObj],
        textureObj
      );
    }

    return this.newTextures;
  }
  loadItem(terrain) {
    let imagesPreview = {};
    for (const element in terrain) {
      let img = new loadImg(terrain[element], this.checkLoad.bind(this));
      imagesPreview[element] = img;
      console.log(img);
      this.queue.push(img);
    }
    return imagesPreview;
  }
  checkLoad() {
    this.elementLoaded++;
    if (this.elementLoaded == this.queue.length) {
      this.complete = true;
      this.Map.finalizarCarga(this.name);
    }
  }
}
