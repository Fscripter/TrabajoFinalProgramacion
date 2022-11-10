class Narrativa {
  constructor(engine) {
    this.enemyType = {
      fanstasma: false,
      candileja: false,
      mohan: false,
      patasola: false,
      bruja: false,
      cura: false,
      sombreron: false,
      llorona: false,
      diablo: false,
    };
    this.engine = engine;
    this.info = {
      fanstasma: {
        texto: "",
        audio: new Audio(),
      },
      candileja: {
        texto: "",
      },
      mohan: {
        texto: "",
        audio,
      },
    };
  }
}
