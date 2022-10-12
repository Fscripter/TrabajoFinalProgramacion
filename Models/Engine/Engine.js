class Engine {
  constructor() {
    console.clear();
    console.log("Game engine started!");
    this.enemys = new enemySpawner();
    this.boxes = new boxSpawner();

    console.log("Physics engine loading...");
    this.physics = new Physic();

    console.log("Colision engine loading...");
    this.collisionEngine = new Collider();
  }
  createObjects(map = Array) {
    this.map = map;
    console.log("Creating objects...");

    for (let yAxis = 0; yAxis < map.length; yAxis++) {
      for (let xAxis = 0; xAxis < map[yAxis].length; xAxis++) {
        let dateStructure = {
          x: xAxis,
          y: yAxis,
          value: map[yAxis][xAxis],
        };
        this.enemys.getEnemysFromMap(dateStructure);
        // this.boxes.getBoxesFromMap(dateStructure);
      }
    }
    console.log("Objects created! ✔");
    //Add physics
    this.physics.getMap(map);
    //Add objects
    this.collisionEngine.addObjects(this.boxes, this.enemys);
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
  addQueue(colaHud = new ColaHUD()) {
    colaHud.actualizarPosicion(this.canvasPosition);
    this.enemys.enemys.forEach((enemy) => {
      let isIn = this.isInScreen(enemy);
      if (isIn) {
        colaHud.add(enemy);
      }
    });
  }
  getPlayer(player) {
    this.player = player;
    this.collisionEngine.getPlayer(this.player);
  }
  getDog(dog) {
    this.dog = dog;
  }
  enemyIAtoPlayer() {
    this.enemys.enemys.forEach((enemy) => {
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
      this.enemys.enemys.concat(this.boxes.boxes).concat(this.player).concat(this.dog)
    );
    this.physics.onGravity(this.searchGrenadesInPlayer(), true);
    this.enemys.draw(context);
    this.boxes.draw(context);
  }
}
