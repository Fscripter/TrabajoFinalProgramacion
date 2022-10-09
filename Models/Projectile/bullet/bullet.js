class bullet extends Projectile{
    constructor(position,orientation,damage){
        this.damage = 30;
        this.size = {
            w:10,
            h:5,
        },
        this.image.src = "./bullet.png"
        this.speed = 30;
        if (orientation=="L"){
            this.speed*=-1
        }
    }
    draw(context) {
        super.draw(context)
        this.move()
    };
    move(){
        this.positionWorld.x += this.speed
    }
}