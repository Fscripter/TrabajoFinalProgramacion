let settings = {
  states: ["Default"],
  tileWidth: 32,
  animations: {
    Default: {
      transitionTime: 100,
      loop: false,
      spriteSheet: {
        l: new ImagenDerogada(""),
        r: new ImagenDerogada(""),
      },
    },
  },
};
class AnimatorEngine {
  constructor(params = settings, size) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    this.states = params.states;
    this.tileWidth = params.tileWidth;
    this.animations = params.animations;
    this.animations.Default.spriteSheet.l.onload = () => {
      this.animations.Default.spriteSheet.r.onload = () => {
        let maxFrame = this.animations.Default.spriteSheet.r.naturalWidth / this.tileWidth;
        console.log(maxFrame);
        this.setMaxFrame(Math.floor(maxFrame));
      };
      this.changeState("Default");
      // this.orientation = "R";
      this.size = size;
    };
    this.canvas.width = this.tileWidth;
  }
  changeOrientation(newOrientation) {
    if (this.orientation == newOrientation) {
      return;
    }
    if (newOrientation != this.orientation) {
      this.orientation = newOrientation;
    }
  }
  setMaxFrame(maxFrame) {
    this.maxFrame = maxFrame;
  }
  changeKeyFrameAnimation() {
    this.currentAnimation = this.animations[this.currentState];
    if (this.currentAnimation == undefined) {
      console.log("Animacion no encontrada");
    }
    this.setTimer();
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
      this.clearCanvas();
    }
  }
  increaseTimer() {
    this.timeElapsed += 1000 / 60;
    if (this.timeElapsed > this.currentAnimation.transitionTime) {
      this.skipFrame();
      this.clearCanvas();
    }
  }
  changeState(newState) {
    if (this.states.indexOf(newState) == -1 || this.currentState == newState) {
      //Es el mismo o no se encuentra
      return;
    }
    this.currentState = newState;
    this.changeKeyFrameAnimation();
  }
  clearCanvas() {
    this.canvas.width = this.canvas.width;
  }
  drawAnimation(ops = { h: 32, s: { w: 50, h: 50 } }) {
    this.increaseTimer();
    this.clearCanvas();
    if (this.orientation == null) {
      this.orientation = "R";
    }
    this.context.drawImage(
      this.currentAnimation.spriteSheet[this.orientation.toLowerCase()],
      this.tileWidth * this.actualFrame,
      0,
      this.tileWidth,
      ops.h,
      0,
      0,
      ops.s.w,
      ops.s.h
    );
    return this.canvas;
  }
}
