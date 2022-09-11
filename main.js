window.onload = () => {
  var mapaCanvas = new Mapa();
  mapaCanvas.cargarZona("Antioquia");
  let jugador = new Player();
  //Añadir fisicas
  var Fisicas = new Fisica([jugador]);
  //Cola enemigos
  let ColaHUDCanvas = new ColaHUD();
  //Mover teclado
  let tecladoRuntime = new Teclado(jugador, mapaCanvas, Fisicas.deltaTime);
  let request;

  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    //animate something
    tecladoRuntime.realizarAccion();
    mapaCanvas.limpiar();
    mapaCanvas.draw();
    ColaHUDCanvas.actualizarPosicion(mapaCanvas.canvasPosition);
    Fisicas.aplicarGravedad(mapaCanvas.mapaArray, mapaCanvas.canvasPosition);
    Fisicas.reduccionEnemigosCanvas(mapaCanvas.canvasPosition, ColaHUDCanvas);
    Fisicas.enemigoDetectarJugador(mapaCanvas.context);
    Fisicas.colisionBalasJugador();
    Fisicas.colisionBalasEnemigos();

    ColaHUDCanvas.dibujar(mapaCanvas.context);
    jugador.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
  };
  requestAnimationFrame(performAnimation);
};
