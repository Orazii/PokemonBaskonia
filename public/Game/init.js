(function(){
    window.mapak = {}
    const overworld = new Overworld({
        pantaia: document.querySelector('.jolas-edukiontzia').querySelector('#jolasa')
    })
    async function loadMaps(){
        const response = await fetch("http://localhost:3000/Game/mapak.json", {
            method: 'GET',
        })
        let jsonfile = await response.json()
        let maps = jsonfile.mapak
        
        Object.keys(maps).forEach(key => {
            window.mapak[key] = new Mapa({
                srcDOWN: maps[key].srcDOWN,
                srcUP: maps[key].srcUP,
                okupatuta: maps[key].okupatuta,
                objektuak: [],
                mapchanges: maps[key].mapchanges,
                nun: maps[key].nun,
                izena: key,
            })
            if(maps[key].cutscenes){
                window.mapak[key].cutscenes = maps[key].cutscenes;
            }
            Object.keys(maps[key].objektuak).forEach(objektua => {
                window.mapak[key].objektuak[objektua] = new Pertsona({
                    src: maps[key].objektuak[objektua].skin,
                    x: maps[key].objektuak[objektua].x,
                    y: maps[key].objektuak[objektua].y,
                    kontrolatua: maps[key].objektuak[objektua].kontrolatua,
                    izena: objektua,
                    textua: maps[key].objektuak[objektua].textua,
                    loop: maps[key].objektuak[objektua].loop
                })
            })
        })
    }
    async function loadSaved(){
        const response = await fetch("http://localhost:3000/saved", {
            method: 'GET',
        })
        let jsonfile = await response.json()
        window.mapa = window.mapak[jsonfile.mapa]

        Object.keys(window.mapak).forEach(map => {
            window.mapak[map].objektuak.protagonista = new Pertsona({
                src: jsonfile.protagonista.skin,
                kontrolatua: true,
                izena: jsonfile.protagonista.izena 
            })
        })
        window.mapa.objektuak.protagonista = new Pertsona({
            src: jsonfile.protagonista.skin,
            x: jsonfile.protagonista.x,
            y: jsonfile.protagonista.y,
            direkzioa: jsonfile.protagonista.dir,
            kontrolatua: true,
            izena: jsonfile.protagonista.izena 
        })
        window.saved = {
            dominak: jsonfile.dominak,
            denbora: jsonfile.denbora
        }
        window.marraztu = []
        let denborakontadorea =()=>{
            window.saved.denbora += 1;
            setTimeout(()=>{
                denborakontadorea()
            }, 1000)
        }
        denborakontadorea()
        overworld.init()
    }
    loadMaps().then(loadSaved())   
})()

