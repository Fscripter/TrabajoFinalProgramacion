function gameLoop(mapaCanvas) {
  //Añadir fisicas
  let Marin = new Player({
    x: 500,
    y: 0,
  });
  let totalObjects = [Marin]
    .concat(mapaCanvas.boxGenerator.boxes)
    .concat(mapaCanvas.enemyGenerator.enemys);
  var Fisicas = new Fisica(totalObjects);
  mapaCanvas.collider.getPlayer(Marin);
  //Cola enemigos
  let ColaHUDCanvas = new ColaHUD();
  //Mover teclado
  let tecladoRuntime = new Teclado(Marin, mapaCanvas, Fisicas.deltaTime);
  let request;

  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    tecladoRuntime.realizarAccion();
    //animate something
    mapaCanvas.movimientoY(Marin.positionWorld.y);
    mapaCanvas.limpiar();
    mapaCanvas.draw();
    //Dibujar aqui

    Marin.draw(mapaCanvas.context);
    Fisicas.aplicarGravedad(mapaCanvas.mapaArray, mapaCanvas.canvasPosition);
    Fisicas.reduccionEnemigosCanvas(mapaCanvas.canvasPosition, ColaHUDCanvas);
    //Cola enemigos
    ColaHUDCanvas.actualizarPosicion(mapaCanvas.canvasPosition);
    ColaHUDCanvas.dibujar(mapaCanvas.context);
  };
  requestAnimationFrame(performAnimation);
}

window.onload = () => {
  var mapaCanvas = new Mapa();
  let Menu = new MenuJuego(mapaCanvas, gameLoop);
};
