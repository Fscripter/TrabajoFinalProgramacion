window.onload = () => {
  var mapaCanvas = new Mapa();
  mapaCanvas.cargarZona("Antioquia");

  let request;
  let player1 = new Player();
  let alien = new Enemy();

  //Añadir fisicas
  var Fisicas = new Fisica([player1, alien]);

  //Main Loop
  const performAnimation = () => {
    request = requestAnimationFrame(performAnimation);
    //animate something
    mapaCanvas.limpiar();
    mapaCanvas.draw();
    Fisicas.aplicarGravedad(mapaCanvas.mapaArray, mapaCanvas.canvasPosition);
    player1.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
    alien.dibujar(mapaCanvas.context, mapaCanvas.canvasPosition);
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
      player1.mover(10);
      mapaCanvas.canvasPosition.x -= 10; // Flecha derecha
      // mapaCanvas.context.translate(player1.cuadrantePosicion.x);
    }
    if (map[37] || map[65]) {
      player1.mover(-10);
      mapaCanvas.canvasPosition.x += 10; // Flecha Izquierda
    }
    if (map[32]) {
      player1.disparar();
    }
    if (map[189]) {
      player1.recibirDano();
    }
  };
};
