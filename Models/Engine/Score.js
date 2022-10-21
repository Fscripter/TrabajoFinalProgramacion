class Score {
  constructor() {
    this.actualScore = 0;
    this.img = new ImagenDerogada("./Sprites/Menu/UI/skull.png");
    this.size = {
      w: 120,
      h: 50,
    };
  }
  draw(context, position) {
    context.fillStyle = "#000000";
    context.fillRect(position.x - 10, position.y - 8, this.size.w, this.size.h);
    context.drawImage(this.img, position.x, position.y, 35, 35);
    context.fillStyle = "#FFFFFF";
    context.font = "bolder 25px Serif";
    context.fillText(`x ${this.actualScore}`, position.x + 50, position.y + 25);
  }
  increaseScore() {
    this.actualScore++;
    console.log("Hi", this);
  }
}
