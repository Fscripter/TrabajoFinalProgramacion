class MenuJuego {
  constructor(mapa, gameLoop) {
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
    this.zonas = ["Pacifico", "Antioquia", "Amazonia"];
    this.zonaElegida = this.zonas[1];
    this.initialMenu = document.getElementById("Menu");
    this.cargando = document.getElementById("Cargando");
    this.juego = document.getElementById("Juego");
    this.mapa = mapa;
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
    console.log(this.mapa);
    this.juego.style.display = "flex";
    this.mapa.cargarZona(this.zonaElegida, this);
  }
  finalizarCarga(mapaCanvas) {
    this.state = "MapaCargado";
    this.initialMenu.style.display = "none";
    this.cargando.style.display = "none";
    this.gameLoop(this.mapa);
  }
}
