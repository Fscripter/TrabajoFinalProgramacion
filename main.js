window.onload = () => {
  var mapaCanvas = new Mapa();
  mapaCanvas.cargarZona("Antioquia");
  let jugador = new Player();
  let alien = new Enemy({
    x: 100,
    y: 0,
  });
  let alien2 = new Enemy({
    x: 2000,
    y: 0,
  });
  //Añadir fisicas
  var Fisicas = new Fisica([jugador, alien, alien2]);
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
    Fisicas.aplicarGravedad(mapaCanvas.mapaArray, mapaCanvas.canvasPosition);
    jugador.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
    alien.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
    alien2.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
  };
  requestAnimationFrame(performAnimation);
};
