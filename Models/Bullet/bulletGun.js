class BulletGun extends Bullet {
  constructor(position, orientation, callback) {
    super(
      position,
      {
        w: 50,
        h: 25,
      },
      "./Sprites/Balas/Bala.png",
      orientation,
      callback
    );
  }
}
