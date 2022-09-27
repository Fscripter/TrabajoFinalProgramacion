class TNT extends Box {
    constructor (position,size,baseUrl){
        super(position,size,baseUrl);
        this.damage = 40;
        this.radius = 150;
        this.active = True;
        this.isblow = False;
    }
    blow(Player,enemysArray){
        if (this.isblow == false){
            return;
        }
        for (enemy in enemysArray){
            let X = Math.abs(enemy.positionWorld.position.x - this.positionWorld.x);
            let Y =  Math.abs(enemy.positionWorld.position.y - this.positionWorld.y);
            let radioInteraccion = Math.pow(X,2) + Math.pow(Y,2) // X.X + Y.Y = R.R
            if (radioInteraccion<= Math.pow(this.radius,2)){
                enemy.doDamage(this.damage);
            }
        }
        let X = Math.abs(enemy.positionWorld.position.x - this.positionWorld.x);
        let Y =  Math.abs(enemy.positionWorld.position.y - this.positionWorld.y);
        let radioInteraccion = Math.pow(X,2) + Math.pow(Y,2) // X.X + Y.Y = R.R
        if (radioInteraccion<= Math.pow(this.radius,2)){
                enemy.doDamage(this.damage);
            }
        this.active = False;            
    }
    interaction(Player,enemysArray){
        this.blow(Player,enemysArray);
    }
    changeEvent(){
        this.isblow = True;
    }
    
} 

