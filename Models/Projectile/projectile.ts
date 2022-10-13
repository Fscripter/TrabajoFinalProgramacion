interface iPosition {
  x: number;
  y: number;
}
interface iSize {
  w: number;
  h: number;
}
class Projectile {
  positionWorld: iPosition;
  orientation: string;
  size: iSize;
  damage: number;
  image: ImagenDerogada;
  id: string;
  collider: Hitbox;
  callback: Function;

  constructor(position: iPosition, orientation: string, size: iSize, damage: number) {
    this.positionWorld = position;
    this.orientation = orientation;
    this.size = size;
    this.damage = damage;
    this.image = new ImagenDerogada("./Sprites/Objects/Cajas1.jpeg");
    this.id = new Date().getMilliseconds() + "" + Math.random();
    this.collider = new Hitbox(this);
    this.callback = () => {};
  }
  addCallback(callback: () => void) {
    this.callback = callback;
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.image,
      this.positionWorld.x,
      this.positionWorld.y,
      this.size.w,
      this.size.h
    );
    this.collider.draw(context);
  }
  delete() {
    this.callback(this.id);
  }
}
