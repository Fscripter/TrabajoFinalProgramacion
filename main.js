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

  var map = []; // Or you could call it "key"
  onkeydown = onkeyup = function (e) {
    e = e || event;
    map[e.keyCode] = e.type == "keydown";

    console.log(e.keyCode);
    if (map[38] || map[87]) {
      // Flecha arriba o W
      player1.salto();
    }
    if (map[68] || map[39]) {
      player1.moverDerecha(); // Flecha derecha
      // mapaCanvas.context.translate(player1.cuadrantePosicion.x);
      mapaCanvas.columnaIndice = player1.cuadrantePosicion.x;
    }
    if (map[37] || map[65]) {
      player1.moverIzquierda(); // Flecha Izquierda
    }
  };
};
