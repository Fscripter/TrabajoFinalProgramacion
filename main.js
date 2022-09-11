window.onload = () => {
  var mapaCanvas = new Mapa();
  mapaCanvas.cargarZona("Antioquia");
  let jugador = new Player();
  let alien = new Enemy(
    {
      x: 500,
      y: 0,
    },
    5
  );
  //Añadir fisicas
  var Fisicas = new Fisica([jugador, alien]);
  //Cola enemigos
  let ColaHUDCanvas = new ColaHUD();
  //Mover teclado
  let tecladoRuntime = new Teclado(jugador, mapaCanvas, Fisicas.deltaTime);
  let request;

  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    //animate something
    tecladoRuntime.realizarAccion(mapaCanvas);
    mapaCanvas.movimientoY(jugador.posicion.y);
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
    alien.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
  };
  requestAnimationFrame(performAnimation);
};
