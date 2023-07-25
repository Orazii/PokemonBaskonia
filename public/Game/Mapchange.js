class Mapchange {
    constructor(){
        this.div = document.querySelector('.jolas-edukiontzia').querySelector('.mapchange')
        this.transitioning = false;
    }
    changemap(mapchange){
        this.transitioning = true;
        window.mapa.cutscene = true;
        this.div.style.animationName = 'opacitytoone';
        var direkzioa = window.mapa.objektuak.protagonista.direkzioa
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
        window.mapak[mapchange.nora].objektuak.protagonista.x = x 
        window.mapak[mapchange.nora].objektuak.protagonista.y = y
        window.mapak[mapchange.nora].objektuak.protagonista.xx = grid(x) 
        window.mapak[mapchange.nora].objektuak.protagonista.yy = grid(y)
        window.mapak[mapchange.nora].objektuak.protagonista.mugimenduaFaltan = 0
        window.mapak[mapchange.nora].objektuak.protagonista.direkzioa = direkzioa
        setTimeout(()=>{
            window.mapa = window.mapak[mapchange.nora];
            this.div.style.animationName = 'opacitytozero';
            window.mapa.objektuak.protagonista.kontrolatua = false;
        }, 500)
        setTimeout(()=>{
            window.mapa.objektuak.protagonista.kontrolatua = true;
            this.transitioning = false;
            window.mapa.cutscene = false;
        },1000)
    }
}

window.mapchange = new Mapchange()