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
  let lastFrame = 0;

  //Mover teclado
  let tecladoRuntime = new Teclado(Marin, mapaCanvas, 60 / 1000, Sky, GameEngine);
  let request;
  GameEngine.getPlayer(Marin);
  GameEngine.getDog(Sky);
  Sky.getPlayer(Marin);

  setInterval(() => {
    lastFrame = fps;
    fps = 0;
  }, 1000);
  var suma = 0;
  var n = 0;
  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    if (GameEngine.state != "Stop") {
      let item = window.performance.now();
      tecladoRuntime.realizarAccion();
      GameEngine.getCanvasPosition(mapaCanvas.canvasPosition);
      //animate something
      mapaCanvas.movimientoY(Marin.positionWorld.y);
      mapaCanvas.limpiar();
      mapaCanvas.draw();
      //Dibujar aqui
      GameEngine.render(mapaCanvas.context);

      Marin.draw(mapaCanvas.context);
      // Sky.draw(mapaCanvas.context);
      fps++;
      //Cola enemigos
      // ColaHUDCanvas.actualizarPosicion(mapaCanvas.canvasPosition);
      mapaCanvas.context.fillStyle = "#FF0000";
      mapaCanvas.context.fontStyle = "arial 25px";
      mapaCanvas.context.fillText(
        lastFrame,
        -mapaCanvas.canvasPosition.x + 900,
        mapaCanvas.canvasPosition.y + 800
      );
      let itemEnd = window.performance.now();
      if (n < 2000) {
        n++;
        suma += itemEnd - item;
      }
      if (n == 2000) {
        console.log(suma / n);
      }

      GameEngine.rayTracing(mapaCanvas.context, mapaCanvas);
    }
  };
  requestAnimationFrame(performAnimation);
}

window.onload = () => {
  var GameEngine = new Engine();
  var mapaCanvas = new Mapa(GameEngine);
  let Menu = new MenuJuego(mapaCanvas, GameEngine, gameLoop);
  GameEngine.getMenu(Menu);
};
