class Animator {
  constructor(settings, orientation = null) {
    this.states = settings.states;
    this.animations = settings.animations;
    this.currentState = settings.states[0];
    this.id = new Date().getTime();
    this.currentAnimation = settings.animations[0];
    this.actualFrame = 0;
    this.timeElapsed = 0;
    this.orientation = orientation;
    this.lastFrame = false;
    this.maxFrame = Math.floor(
      this.currentAnimation.animaciones.derecha[this.actualFrame].width / 32
    );
    // console.log(`Animations made with ID ${this.id}`);
  }
  changeOrientation(newOrientation) {
    this.orientation = newOrientation;
  }
  setTimer() {
    this.actualFrame = 0;
    this.timeElapsed = 0;
    this.lastFrame = false;
  }
  skipFrame() {
    this.actualFrame++;
    if (this.actualFrame + 1 > this.maxFrame) {
      if (this.currentAnimation.loop == false) {
        this.actualFrame--;
        this.lastFrame = true;
      } else {
        this.setTimer();
      }
    } else {
      this.timeElapsed = 0;
    }
  }
  increaseTimer() {
    this.timeElapsed += 1000 / 60;
    if (this.timeElapsed > this.currentAnimation.transitionTime) {
      this.skipFrame();
    }
  }
  drawAnimation() {
    this.increaseTimer();
    if (this.orientation == null) {
      return this.currentAnimation.animaciones.derecha[this.actualFrame];
    }
    if (this.orientation == "R") {
      return this.currentAnimation.animaciones.derecha[this.actualFrame];
    }
    return this.currentAnimation.animaciones.izquierda[this.actualFrame];
  }
  draw(context) {
    context.drawImage(
      this.currentAnimation.animaciones.derecha[0],
      32 * this.actualFrame,
      0,
      32,
      32,
      0,
      0,
      32,
      32
    );
  }
  changeKeyFrameAnimation() {
    //select animation
    this.animations.forEach((animacion) => {
      if (animacion.id == this.currentState) {
        this.currentAnimation = animacion;
      }
    });
    this.setTimer();
    // console.log(`ID: ${this.id}, State is: ${this.currentState}`);
  }
  changeState(newState) {
    if (this.states.indexOf(newState) == -1 || this.currentState == newState) {
      //Es el mismo o no se encuentra
      return;
    }
    this.currentState = newState;
    this.changeKeyFrameAnimation();
  }
}
