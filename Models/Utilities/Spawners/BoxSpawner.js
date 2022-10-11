class boxSpawner {
  constructor() {
    this.totalBoxes = {
      healers: 0,
      Rifle: 0,
      tnt: 0,
      Laser: 0,
      Flamethrower: 0,
      Grenade: 0,
      total: 0,
    };
    this.boxes = [];
  }
  spawnBox(Type, Posicion) {
    let acceptedTypes = ["X", "H", "P", "L", "G", "F"];
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
        this.totalBoxes.Rifle++;
        this.totalBoxes.total++;
        break;
      case "X":
        this.boxes.push(new TNT(Posicion));
        this.totalBoxes.tnt++;
        this.totalBoxes.total++;
        break;
      case "L":
        this.boxes.push(new BoxLaser(Posicion));
        this.totalBoxes.BoxLaser++;
        this.totalBoxes.total++;
        break;
      case "F":
        this.boxes.push(new Boxflamethrower(Posicion));
        this.totalBoxes.Flamethrower++;
        this.totalBoxes.total++;
        break;
      case "G":
        this.boxes.push(new BoxGrenade(Posicion));
        this.totalBoxes.Grenade++;
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
