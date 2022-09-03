class Mapa {
  constructor() {
    this.zonas = ["Pacifico", "Antioquia", "Amazonia"];
    this.canvas= document.getElementById("Game-ViewPort");
    this.context =  this.canvas.getContext("2d");
    this.columnaIndice = 0;
    this.texturas = {
      S: new Image(),
      T: new Image(),
      A: new Image(),
      L: new Image(),
      D: new Image(),
      Layout: new Image()
    }
  };
  cargarTexuras(){
    this.texturas.S.src = this.mapaData.texturas.S;
    this.texturas.T.src = this.mapaData.texturas.T;
    this.texturas.A.src = this.mapaData.texturas.A;
    this.texturas.L.src = this.mapaData.texturas.L;
    this.texturas.D.src = this.mapaData.texturas.D;
    this.texturas.Layout.src = this.mapaData.texturas.Layout;
  }
  cargarZona(name) {
    fetch(`MapData/${name}.json`)
      .then((response) => {
        return response.json();
      })
      .then((rawJson) => {
        //Accedo a la data del mapa
        this.mapaData = rawJson;

        //Obtengo el array del mapa
        this.mapaArray = this.mapaData.Mapa.map((elemento) => {
          return elemento.join().split("");
        });

        this.cargarTexuras();
      });
  }
  viewPort() {
    this.mapaView = [];
    //Extraer nada mas el viewport
    for (let fila = 0; fila < this.mapaArray.length; fila++) {
      let filas = [];

      if (this.mapaArray[fila] != undefined) {
        for (
          let columna = this.columnaIndice;
          columna < this.columnaIndice + 20;
          columna++
        ) {
          filas.push(this.mapaArray[fila][columna]);
        }
      }

      this.mapaView.push(filas);
    }
  }
  limpiar() {
    this.canvas.width = this.canvas.width;
  }
  dibujarMapa() {
    this.viewPort();
    this.context.drawImage(this.texturas.Layout,0,0,this.canvas.width, this.canvas.clientHeight);
    // Dibujar solo lo que este en el viewPort
    for (let fila = 0; fila < 11; fila++) {
      for (let columna = 0; columna < 20; columna += 1) {
        if (this.mapaView[fila][columna] == "T") {
          this.context.drawImage(this.texturas.T, columna *50, (fila + 1)*50,50,50);
        }
        if (this.mapaView[fila][columna] == "S") {
          this.context.drawImage(this.texturas.S, columna *50, (fila + 1)*50,50,50);
        }
        if(this.mapaView[fila][columna] == "A"){
          this.context.drawImage(this.texturas.A, columna *50 -50, (fila + 1)*50 - 145,150,200);
        }
        if (this.mapaView[fila][columna] == "L") {
          this.context.drawImage(this.texturas.L, columna *50, (fila + 1)*50,50,50);
        }
        if (this.mapaView[fila][columna] == "D") {
          this.context.drawImage(this.texturas.D, columna *50, (fila + 1)*50,50,50);
        }
      }
    }
  }
}
