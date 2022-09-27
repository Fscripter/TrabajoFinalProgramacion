class BoxHealing extends Box {
    constructor(position,size,baseUrl){
        super(position,size,baseUrl);
        this.Healing = 60;
    }
    Healing(Target){
        Target.life += this.Healing;
    }
    interaction(Player,enemysArray){
        super.interaction();
        this.Healing(Player);
    }
}