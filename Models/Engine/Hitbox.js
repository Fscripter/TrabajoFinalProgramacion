class Hitbox {
  constructor(gameObject, Character) {
    this.normal = {
      x: gameObject.positionWorld.x,
      y: gameObject.positionWorld.y,
      w: gameObject.size.w,
      h: gameObject.size.h,
    };
    this.down = {
      x: gameObject.positionWorld.x,
      y: gameObject.positionWorld.y,
      w: gameObject.size.w,
      h: gameObject.size.h / 1.4,
    };
    this.measure = this.normal;
    this.gameObject = gameObject;
    this.states = ["Estatico", "Down"];
    this.currentState = "Estatico";
  }
  getPosition() {
    return this.gameObject.positionWorld;
  }
  changeState(newState) {
    if (newState != this.currentState) {
      this.currentState = newState;
      if (newState == "Estatico") {
        this.measure = this.normal;
        this.updateMeasure();
      } else {
        this.measure = this.down;
        this.updateMeasure();
      }
    }
  }
  updateMeasure() {
    this.measure.x = this.getPosition().x;
    this.measure.y = this.getPosition().y;
    if (this.currentState == "Down") {
      this.measure.y += this.gameObject.size.h - this.measure.h;
    }
  }
  draw(context) {
    this.updateMeasure();
    // context.strokeStyle = "#00FF00";
    // context.strokeRect(this.measure.x, this.measure.y, this.measure.w, this.measure.h);
  }
}
