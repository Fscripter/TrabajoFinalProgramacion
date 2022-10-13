class Grenade extends Projectile {
  constructor(position, orientation) {
    super(position, orientation, {
      w: 20,
      h: 20,
    });
    this.velocidad = {
      x: 8,
      y: -10,
    };
    if (this.orientation != "R") {
      this.velocidad.x *= -1;
    }
    this.physicsData = {
      isGravity: true,
      jumpForce: 10,
      isGround: false,
    };
    this.stateData = {
      jumping: true,
    };
    this.lifeTime = 3;
    this.isBlow = false;
    this.readyToBlow = false;
    this.active = true;
    this.life = 0;
    this.image = new ImagenDerogada("./Sprites/Balas/Grenade.png");
    this.collider = new Collision(this);
    this.radius = 75;
    this.damage = 40;
    this.sound = new Audio("./Sprites/Objects/TNT.mp3");
  }
  reducirVida() {
    if (this.physicsData.isGround) {
      this.readyToBlow = true;
    }
  }
  blow(Player, enemysArray) {
    this.speed = 0;
    console.log(enemysArray);
    enemysArray = enemysArray.concat(Player);
    let enemysAffected = 0;
    enemysArray.forEach((enemy) => {
      let X = Math.abs(enemy.positionWorld.x - this.positionWorld.x);
      let Y = Math.abs(enemy.positionWorld.y - this.positionWorld.y);
      let radioInteraccion = Math.pow(X, 2) + Math.pow(Y, 2); // X.X + Y.Y = R.R
      if (radioInteraccion <= Math.pow(this.radius, 2)) {
        enemy.doDamage(this.damage);
        enemysAffected++;
      }
    });
    this.sound.play();
    this.isBlow = true;
    this.delete();
  }
  mover() {
    this.positionWorld.x += this.velocidad.x;
    this.reducirFuerza();
  }
  draw(context) {
    super.draw(context);
    this.collider.draw(context);
  }
  reducirFuerza() {
    if (this.orientation != "R") {
      this.velocidad.x += 60 / 1000;
      if (this.velocidad.x > 0) {
        this.velocidad.x = 0;
      }
      return;
    }
    //Reducir fuerza en x, y aplicar gravedad
    this.velocidad.x -= 60 / 1000;
    if (this.velocidad.x < 0) {
      this.velocidad.x = 0;
    }
  }
  draw(context) {
    this.reducirVida();
    this.mover();
    super.draw(context);
    context.beginPath();
    context.fillStyle = "rgba(0,255,0,0.2)";
    context.arc(this.positionWorld.x, this.positionWorld.y, this.radius, 0, Math.PI * 2);
    context.fill();
    context.closePath();
  }
}
