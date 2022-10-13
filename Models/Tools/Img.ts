class ImagenDerogada extends Image {
  constructor(url: string) {
    super(0, 0);
    this.src = url;
    return this;
  }
}
