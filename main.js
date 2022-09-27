function gameLoop(mapaCanvas) {
  let jugador = new GameObject(
    { x: 500, y: 400 },
    {
      w: 50,
      h: 100,
    }
  );
  //Añadir fisicas
  // let totalObjects = [jugador].concat(mapaCanvas.enemySpawn.enemys);
  var Fisicas = new Fisica([jugador]);
  //Cola enemigos
  // let ColaHUDCanvas = new ColaHUD();
  //Mover teclado
  // let tecladoRuntime = new Teclado(jugador, mapaCanvas, Fisicas.deltaTime);
  let request;

  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    //animate something
    // tecladoRuntime.realizarAccion(mapaCanvas);
    mapaCanvas.movimientoY(jugador.positionWorld.y);
    mapaCanvas.limpiar();
    mapaCanvas.draw();
    jugador.draw(mapaCanvas.context);
    // ColaHUDCanvas.actualizarPosicion(mapaCanvas.canvasPosition);
    Fisicas.aplicarGravedad(mapaCanvas.mapaArray, mapaCanvas.canvasPosition);
    // // Fisicas.reduccionEnemigosCanvas(mapaCanvas.canvasPosition, ColaHUDCanvas);
    // // Fisicas.enemigoDetectarJugador(mapaCanvas.context);
    // // Fisicas.colisionBalasJugador();
    // // Fisicas.colisionBalasEnemigos();

    // ColaHUDCanvas.dibujar(mapaCanvas.context);
    // jugador.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
  };
  requestAnimationFrame(performAnimation);
}

window.onload = () => {
  var mapaCanvas = new Mapa();
  let Menu = new MenuJuego(mapaCanvas, gameLoop);
};
