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
        this.boxes.getBoxesFromMap(dateStructure);
      }
    }
    console.log("Objects created! ✔");
    //Add physics
    this.physics.getMap(map);
    //Add objects
    this.collisionEngine.addObjects(this.boxes, this.enemys);
  }
  getPlayer(player) {
    this.player = player;
    this.collisionEngine.getPlayer(this.player);
  }
  enemyIAtoPlayer() {
    this.enemys.enemys.forEach((enemy) => {
      enemy.AI(
        {
          positionWorld: this.player.positionWorld,
        },
        this.player.bullets
      );
    });
  }
  render(context) {
    this.enemyIAtoPlayer();
    this.collisionEngine.collision();
    this.physics.onGravity(this.enemys.enemys.concat(this.boxes.boxes).concat(this.player));
    this.enemys.draw(context);
    this.boxes.draw(context);
  }
}
