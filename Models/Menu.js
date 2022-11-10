class MenuJuego {
  constructor(mapa, engine, gameLoop) {
    /**
     * Tiene estados:
     *  Inicial,
     *  Configuracion,
     *  Salir,
     *  Cargando,
     *  MapaCargado
     *  Pausa
     * @member {Object}
     */
    this.state = "Inicial";
    this.zonaCargada = "";
    this.initialMenu = document.getElementById("Menu");
    this.cargando = document.getElementById("Cargando");
    this.pausaMenu = document.getElementById("Pausa");
    this.juego = document.getElementById("Juego");
    this.narrativa = document.getElementById("Narrativa");
    this.mapa = mapa;
    this.engine = engine;
    this.gameLoop = gameLoop;
    this.addEvents();
    this.finalizarCarga = this.finalizarCarga.bind(this);
  }
  addEvents() {
    this.playButtton = document.getElementById("Play");
    this.playButtton.addEventListener("click", () => {
      this.playGame();
    });
  }
  playGame() {
    this.state = "Cargando";
    this.initialMenu.style.display = "none";
    this.cargando.style.display = "flex";

    this.juego.style.display = "flex";
    this.mapa.cargarZona(this);
  }
  finalizarCarga() {
    this.state = "MapaCargado";
    this.pausaMenu.style.display = "none";
    this.juego.style.display = "flex";
    this.initialMenu.style.display = "none";
    this.cargando.style.display = "none";
    this.gameLoop(this.mapa, this.engine);
  }
  pausaNarrativa() {
    this.pausaMenu.style.display = "none";
    this.initialMenu.style.display = "none";
    this.cargando.style.display = "none";
    this.juego.style.display = "none";
    document.getElementById("reanudar").addEventListener("click", () => {
      console.log(this.gameLoop);
      this.pausaMenu.style.display = "none";
      this.juego.style.display = "flex";
      this.initialMenu.style.display = "none";
      this.cargando.style.display = "none";
      this.engine.changeState();
    });
  }
  pausa() {
    this.pausaMenu.style.display = "flex";
    this.initialMenu.style.display = "none";
    this.cargando.style.display = "none";
    this.juego.style.display = "none";
    document.getElementById("reanudar").addEventListener("click", () => {
      console.log(this.gameLoop);
      this.pausaMenu.style.display = "none";
      this.juego.style.display = "flex";
      this.initialMenu.style.display = "none";
      this.cargando.style.display = "none";
      this.engine.changeState();
    });
  }
}
