class Bullet extends Projectile {
    constructor(position, orientation) {
        let size = {
            w: 30,
            h: 10,
        };
        super(position, orientation, size, 30);
        console.log("Ts");
        this.image.src = "./Models/Projectile/bullet/bullet.png";
        this.speed = 10;
        if (orientation != "R") {
            this.speed = -10;
        }
        this.sound = new Audio("./Sprites/Player/Sound/disparo.mp3");
        this.sound.play();
    }
    draw(context) {
        super.draw(context);
        this.move();
    }
    move() {
        this.positionWorld.x += this.speed;
    }
}
