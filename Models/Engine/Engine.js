class Engine {
  constructor() {
    // console.clear();
    console.log("Game engine started!");
    this.enemys = new enemySpawner();
    this.boxes = new boxSpawner();

    console.log("Score engine loading...");
    this.score = new Score();

    console.log("Physics engine loading...");
    this.physics = new Physic();

    console.log("Colision engine loading...");
    this.collisionEngine = new Collider(this);

    this.state = "Running";
    this.time = 0;
    this.lightInGame = [];
  }
  changeState() {
    this.state = this.state == "Running" ? "Stop" : "Running";
    console.log("Estado cambiado", this.state);
    if (this.state == "Stop") {
      this.menu.pausa();
    }
  }
  getMenu(menu) {
    this.menu = menu;
  }
  addBox(boxArr) {
    this.collisionEngine.addBox(boxArr);
  }
  addEnemy(enemyArr) {
    this.collisionEngine.addEnemy(enemyArr);
  }
  createObjects(map = Array) {
    this.map = map;
    //Add physics
    this.physics.getMap(map);
  }
  getCanvasPosition(canvasPosition) {
    this.canvasPosition = canvasPosition;
  }
  isInScreen(gameObject = new GameObject()) {
    if (
      gameObject.positionWorld.x >= -this.canvasPosition.x &&
      gameObject.positionWorld.x < -this.canvasPosition.x + 1000 &&
      gameObject.alive
    ) {
      return true;
    }
  }
  getPlayer(player) {
    this.player = player;
    this.collisionEngine.getPlayer(this.player);
  }
  getDog(dog) {
    this.dog = dog;
  }
  enemyIAtoPlayer() {
    this.collisionEngine.enemys.forEach((enemy) => {
      let isIn = this.isInScreen(enemy);
      if (isIn) {
        enemy.AI(
          {
            positionWorld: this.player.positionWorld,
          },
          this.player.bullets
        );
      }
    });
  }
  searchGrenadesInPlayer() {
    let grenades = [];
    this.player.bullets.forEach((bullet) => {
      if (bullet instanceof Grenade) {
        grenades.push(bullet);
      }
    });
    return grenades;
  }
  render(context) {
    this.enemyIAtoPlayer();
    this.collisionEngine.collision();
    this.physics.onGravity(
      this.enemys.enemys
        .concat(this.collisionEngine.boxes)
        .concat(this.player)
        .concat(this.dog)
    );
    this.physics.onGravity(this.collisionEngine.enemys);
    this.physics.onGravity(this.searchGrenadesInPlayer(), true);
    this.score.draw(context, {
      x: this.player.positionWorld.x + 350,
      y: this.player.positionWorld.y + 250,
    });
  }
  rayTracing(context, mapaCanvas) {
    let layout = new ImagenDerogada("./MapData/Background.png");
    let layoutB = new ImagenDerogada("./MapData/Background - copia.png");
    //This is not ray tracing, sorry xd
    // this.time++;
    // if (this.time < 20) {
    layoutB.style.transform = "rotate(45deg)";
    context.globalCompositeOperation = "multiply";
    context.drawImage(
      layout,
      -mapaCanvas.canvasPosition.x,
      -mapaCanvas.realCanvasPosition.y,
      1000,
      600
    );
    //PPRL cada luz de cada escena
    let light = mapaCanvas.scenes.Laboratory.ligths;
    console.log(light);
    light.forEach((lightPPRL) => {
      context.globalCompositeOperation = "hard-light";
      lightPPRL.draw(context, this.canvasPosition.y);
    });
    // for (const element in light) {
    //   element.draw(context);
    // }
  }
  addLight(Ligth) {}
}
