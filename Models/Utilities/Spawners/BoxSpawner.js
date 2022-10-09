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
  getBoxesFromMap(data) {
    this.spawnBox(data.value, {
      x: data.x * 50,
      y: data.y * 50,
    });
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
