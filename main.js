window.onload = ()=>{
    var mapaCanvas = new Mapa();
    mapaCanvas.cargarZona("Antioquia");

    let request;

    //Main Loop
    const performAnimation = () => {
        request = requestAnimationFrame(performAnimation)
        //animate something
        mapaCanvas.limpiar();
        mapaCanvas.dibujarMapa();
    }
    requestAnimationFrame(performAnimation);

    //move arrows
    window.addEventListener("keydown", (Event)=>{
        if(Event.key == "ArrowRight"){
            mapaCanvas.columnaIndice++;
            console.log("e");
            console.log(mapaCanvas.columnaIndice);
        }
        if(Event.key == "ArrowLeft"){
            if(mapaCanvas.columnaIndice > 0){
                mapaCanvas.columnaIndice--;
            }
        }
        else{
            console.log(Event.key);
        }
    });
}