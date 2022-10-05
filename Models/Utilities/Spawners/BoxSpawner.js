class boxSpawner {
  constructor() {
    this.totalBoxes = {
      healers: 0,
      ammo: 0,
      tnt: 0,
      total: 0,
    };
    this.boxes = [];
  }
  spawnBox(Type, Posicion) {
    let acceptedTypes = ["X", "H", "P"];
    if (acceptedTypes.indexOf(Type) == -1) {
      return;
    }
    switch (Type) {
      case "H":
        this.boxes.push(new BoxHealing(Posicion));
        this.totalBoxes.healers++;
        this.totalBoxes.total++;
        break;
      case "P":
        this.boxes.push(new boxAmmo(Posicion));
        this.totalBoxes.ammo++;
        this.totalBoxes.total++;
        break;
      case "X":
        this.boxes.push(new TNT(Posicion));
        this.totalBoxes.tnt++;
        this.totalBoxes.total++;
        break;
      default:
        break;
    }
  }
  getBoxesFromMap(mapaArray = []) {
    for (let fila = 0; fila < mapaArray.length; fila++) {
      let maxColumn = mapaArray[fila].length;
      for (let columna = 0; columna < maxColumn; columna++) {
        this.spawnBox(mapaArray[fila][columna], {
          x: columna * 50,
          y: fila * 50,
        });
      }
    }
    console.log("Box added");
    this.getInfo();
  }
  getInfo() {
    console.log(
      `Hay un total de: %c${this.totalBoxes.total} cajas`,
      "color: green; font-size: 18px"
    );
  }
  draw(context) {
    this.boxes.forEach((Box) => {
      Box.draw(context);
    });
  }
}
