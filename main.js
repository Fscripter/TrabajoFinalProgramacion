function gameLoop(mapaCanvas, GameEngine) {
  //Añadir fisicas
  let Marin = new Player({
    x: 0,
    y: 0,
  });
  let Sky = new Dog({
    x: 0,
    y: 0,
  });
  let fps = 0;
  //Cola enemigos
  let ColaHUDCanvas = new ColaHUD();
  //Mover teclado
  let tecladoRuntime = new Teclado(Marin, mapaCanvas, 60 / 1000, Sky);
  let request;
  GameEngine.getPlayer(Marin);
  GameEngine.getDog(Sky);
  Sky.getPlayer(Marin);

  setInterval(() => {
    console.log(fps);
    fps = 0;
  }, 1000);
  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    tecladoRuntime.realizarAccion();
    GameEngine.getCanvasPosition(mapaCanvas.canvasPosition);
    GameEngine.addQueue(ColaHUDCanvas);
    //animate something
    mapaCanvas.movimientoY(Marin.positionWorld.y);
    mapaCanvas.limpiar();
    mapaCanvas.draw();
    //Dibujar aqui
    GameEngine.render(mapaCanvas.context);

    Marin.draw(mapaCanvas.context);
    Sky.draw(mapaCanvas.context);
    fps++;
    //Cola enemigos
    // ColaHUDCanvas.actualizarPosicion(mapaCanvas.canvasPosition);
    ColaHUDCanvas.dibujar(mapaCanvas.context);
  };
  requestAnimationFrame(performAnimation);
}

window.onload = () => {
  var GameEngine = new Engine();
  var mapaCanvas = new Mapa(GameEngine);
  let Menu = new MenuJuego(mapaCanvas, GameEngine, gameLoop);
};
