window.onload = () => {
  var mapaCanvas = new Mapa();
  mapaCanvas.cargarZona("Antioquia");
  let jugador = new Player();
  let alien = new Enemy({
    x: 1000,
    y: 0,
  });
  let alien2 = new Enemy({
    x: 400,
    y: 0,
  });
  let alien3 = new Enemy({
    x: 500,
    y: 0,
  });
  //Añadir fisicas
  var Fisicas = new Fisica([jugador, alien, alien2, alien3]);
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
    Fisicas.colisionBalas();

    ColaHUDCanvas.dibujar(mapaCanvas.context);
    jugador.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
    alien.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
    alien2.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
    alien3.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
  };
  requestAnimationFrame(performAnimation);
};
