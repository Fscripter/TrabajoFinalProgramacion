function gameLoop(mapaCanvas) {
  //Añadir fisicas
  let Marin = new Player({
    x: 500,
    y: 0,
  });
  let totalObjects = [Marin].concat(mapaCanvas.boxGenerator.boxes);
  var Fisicas = new Fisica(totalObjects);
  //Cola enemigos
  // let ColaHUDCanvas = new ColaHUD();
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
  };
  requestAnimationFrame(performAnimation);
}

window.onload = () => {
  var mapaCanvas = new Mapa();
  let Menu = new MenuJuego(mapaCanvas, gameLoop);
};
