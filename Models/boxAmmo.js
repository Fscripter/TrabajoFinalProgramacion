class boxAmmo extends Box {
    constructor(position,size,baseUrl){
        super(position,size,baseUrl)
        this.maxAmmo = 100;     
    }
    GiveAmmo(Target){
        Target.Ammo += 50;
    }
    interaction(Player,Ammo){
        super.interaction();
        this.GiveAmmo(Player);
    }
}