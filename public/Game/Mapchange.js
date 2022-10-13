class Mapchange {
    constructor(){
        this.div = document.querySelector('.jolas-edukiontzia').querySelector('.mapchange')
        this.transitioning = false;
    }
    changemap(mapchange){
        this.transitioning = true;
        Window.mapa.cutscene = true;
        this.div.style.animationName = 'opacitytoone';
        var direkzioa = Window.mapa.objektuak.protagonista.direkzioa
        var x = mapchange.protagonista[0];
        var y = mapchange.protagonista[1];
        if(direkzioa == 'gora'){
            y--
        } else if (direkzioa == 'bera'){
            y++
        } else if (direkzioa == 'ezkerra'){
            x--
        } else if (direkzioa == 'eskubi'){
            x++
        }
        Window.mapak[mapchange.nora].objektuak.protagonista.x = x 
        Window.mapak[mapchange.nora].objektuak.protagonista.y = y
        Window.mapak[mapchange.nora].objektuak.protagonista.xx = grid(x) 
        Window.mapak[mapchange.nora].objektuak.protagonista.yy = grid(y)
        Window.mapak[mapchange.nora].objektuak.protagonista.mugimenduaFaltan = 0
        Window.mapak[mapchange.nora].objektuak.protagonista.direkzioa = direkzioa
        setTimeout(()=>{
            Window.mapa = Window.mapak[mapchange.nora];
            this.div.style.animationName = 'opacitytozero';
            Window.mapa.objektuak.protagonista.kontrolatua = false;
        }, 500)
        setTimeout(()=>{
            Window.mapa.objektuak.protagonista.kontrolatua = true;
            this.transitioning = false;
            Window.mapa.cutscene = false;
        },1000)
    }
}

Window.mapchange = new Mapchange()