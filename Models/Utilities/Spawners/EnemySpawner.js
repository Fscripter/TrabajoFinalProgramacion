class enemySpawner {
  constructor() {
    this.totalEnemigos = {
      tipo: {
        0: 0,
        1: 0,
        2: 0,
        3: 0,
      },
      total: 0,
    };
    this.enemys = [];
    this.scenes = [];
  }
  deleteEnemyFromScene() {}
  spawnEnemys(Level, Posicion) {
    let acceptedLvl = ["0", "1", "2", "3"];
    if (acceptedLvl.indexOf(Level) == -1) {
      return;
    }
    Posicion.y -= 100;
    if (Level == "3") {
      this.enemys.push(new EnemyBoss(Posicion, this.enemys.length, this));
    } else {
      this.enemys.push(new Enemy(Posicion, this.enemys.length, this));
    }

    //Add scenes

    this.totalEnemigos.tipo[Level]++;
    this.totalEnemigos.total++;
  }
  getEnemysFromMap(data) {
    this.spawnEnemys(data.value, {
      x: data.x * 50,
      y: data.y * 50,
    });
  }
  getInfo() {
    console.log(
      `Hay un total de: %c${this.totalEnemigos.total} enemigos`,
      "color: red; font-size: 24px"
    );
  }
  draw(context) {
    this.enemys.forEach((enemy) => {
      enemy.draw(context);
    });
  }
}
