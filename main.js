window.onload = () => {
  var mapaCanvas = new Mapa();
  mapaCanvas.cargarZona("Antioquia");

  let request;
  let player1 = new Player(100, 0, 0, "#ffffff", "#000000");

  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    //animate something
    mapaCanvas.limpiar();
    mapaCanvas.dibujarMapa();
    player1.dibujar(mapaCanvas.context, mapaCanvas.mapaArray);
  };
  requestAnimationFrame(performAnimation);

  window.addEventListener("keydown", moverPlayer);

  function moverPlayer(e) {
    switch (e.key) {
      case "w":
        player1.moverArriba();
        break;

      case "a":
        player1.moverIzquierda();
        break;

      case "d":
        player1.moverDerecha();
        break;
    }
  }
};
