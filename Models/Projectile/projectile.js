"use strict";
var Projectile = /** @class */ (function () {
    function Projectile(position, orientation, size, damage) {
        this.positionWorld = position;
        this.orientation = orientation;
        this.size = size;
        this.damage = damage;
        this.image = new ImagenDerogada("./Sprites/Objects/Cajas1.jpeg");
        this.id = new Date().getMilliseconds() + "" + Math.random();
        this.collider = new Hitbox(this);
        this.callback = function () { };
    }
    Projectile.prototype.addCallback = function (callback) {
        this.callback = callback;
    };
    Projectile.prototype.draw = function (context) {
        context.drawImage(this.image, this.positionWorld.x, this.positionWorld.y, this.size.w, this.size.h);
        this.collider.draw(context);
    };
    Projectile.prototype.delete = function () {
        this.callback(this.id);
    };
    return Projectile;
}());
//# sourceMappingURL=projectile.js.map