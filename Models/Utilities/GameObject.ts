class GameObject {
  positionWorld: iPosition;
  size: iSize;
  imagen: HTMLImageElement;
  collisionSize: iSize;
  velocidad: iPosition;
  physicsData: iPhysicsData;
  stateData: {
    jumping: boolean;
  };

  constructor(position: iPosition, size: iSize, baseUrl: string) {
    this.positionWorld = {
      x: position.x,
      y: position.y - size.h,
    };
    this.imagen = new Image();
    this.imagen.src = baseUrl;
    this.size = size;
    this.collisionSize = size;
    this.velocidad = {
      x: 0,
      y: 0,
    };
    this.physicsData = {
      isGravity: true,
      jumpForce: 10,
      isGround: false,
    };
    this.stateData = {
      jumping: false,
    };
  }
  draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this.imagen,
      this.positionWorld.x,
      this.positionWorld.y,
      this.size.w,
      this.size.h
    );
  }
}
