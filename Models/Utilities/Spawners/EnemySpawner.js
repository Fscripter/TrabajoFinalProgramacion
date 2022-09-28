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
  spawnEnemys(Level, Posicion) {
    let acceptedLvl = ["0", "1", "2", "3"];
    if (acceptedLvl.indexOf(Level) == -1) {
      return;
    }
    Posicion.y -= 100;
    this.enemys.push(new Enemy(Posicion, Level));

    //Add scenes

    this.totalEnemigos.tipo[Level]++;
    this.totalEnemigos.total++;
  }
  getEnemysFromMap(mapaArray = []) {
    for (let fila = 0; fila < mapaArray.length; fila++) {
      let maxColumn = mapaArray[fila].length;
      for (let columna = 0; columna < maxColumn; columna++) {
        this.spawnEnemys(mapaArray[fila][columna], {
          x: columna * 50,
          y: fila * 50,
        });
      }
    }
    console.log("Enemys added");
    this.getInfo();
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
