class Collision {
  constructor(character = new Character()) {
    this.initialSettings = {
      x: character.positionWorld.x,
      y: character.positionWorld.y,
      w: character.size.w,
      h: character.size.h,
    };
    this.downSettings = {
      x: character.positionWorld.x,
      y: character.positionWorld.y,
      w: character.size.w,
      h: character.size.h / 1.4,
    };
    this.measure = this.initialSettings;
    this.character = character;
    this.acceptedStates = ["Estatico", "Down"];
    this.currentState = "Estatico";
  }
  changeState(newState) {
    if (newState != this.currentState) {
      this.currentState = newState;
      if (newState == "Estatico") {
        this.measure = this.initialSettings;
        this.getPosition();
      } else {
        this.measure = this.downSettings;
        this.getPosition();
      }
    }
  }
  getPosition() {
    this.measure.x = this.character.positionWorld.x;
    this.measure.y = this.character.positionWorld.y;
    if (this.currentState == "Down") {
      this.measure.y += this.character.size.h - this.measure.h;
    }
  }
  draw(context) {
    this.getPosition();
    context.strokeStyle = "#00FF00";
    context.strokeRect(this.measure.x, this.measure.y, this.measure.w, this.measure.h);
  }
}
