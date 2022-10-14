class ImagenDerogada extends Image {
    constructor(url) {
        super(0, 0);
        this.src = url;
        return this;
    }
}
