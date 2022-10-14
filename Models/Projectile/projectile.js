class Projectile {
    constructor(position, orientation, size, damage) {
        this.positionWorld = position;
        this.orientation = orientation;
        this.size = size;
        this.damage = damage;
        this.image = new ImagenDerogada("./Sprites/Objects/Cajas1.jpeg");
        this.id = new Date().getMilliseconds() + "" + Math.random();
        this.collider = new Hitbox(this);
        this.callback = () => { };
    }
    addCallback(callback) {
        this.callback = callback;
    }
    draw(context) {
        context.drawImage(this.image, this.positionWorld.x, this.positionWorld.y, this.size.w, this.size.h);
        this.collider.draw(context);
    }
    delete() {
        this.callback(this.id);
    }
}
