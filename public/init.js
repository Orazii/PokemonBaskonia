(function(){
    Window.mapak = {}
    const overworld = new Overworld({
        pantaia: document.querySelector('.jolas-edukiontzia').querySelector('#jolasa')
    })
    const skins = {
        "protagonista-mutila": './images/people/protagonista-mutila.png',
        "protagonista-gorria": './images/people/protagonista-gorria.png',
        "protagonista-neska": './images/people/protagonista-neska.png',
        "n": './images/people/n.png',
        "ama": './images/people/ama.png'
    }
    async function loadMaps(){
        const response = await fetch("http://localhost:3000/mapak.json", {
            method: 'GET',
        })
        let jsonfile = await response.json()
        let maps = jsonfile.mapak
        
        Object.keys(maps).forEach(key => {
            Window.mapak[key] = new Mapa({
                srcDOWN: maps[key].srcDOWN,
                srcUP: maps[key].srcUP,
                okupatuta: maps[key].okupatuta,
                objektuak: [],
                mapchanges: maps[key].mapchanges
            })
            if(maps[key].cutscenes){
                Window.mapak[key].cutscenes = maps[key].cutscenes;
            }
            Object.keys(maps[key].objektuak).forEach(objektua => {
                Window.mapak[key].objektuak[objektua] = new Pertsona({
                    src: skins[maps[key].objektuak[objektua].skin],
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
        Window.mapa = Window.mapak[jsonfile.mapa]

        Object.keys(Window.mapak).forEach(map => {
            Window.mapak[map].objektuak.protagonista = new Pertsona({
                src: skins[jsonfile.protagonista.skin],
                kontrolatua: true,
                izena: jsonfile.protagonista.izena 
            })
        })
        Window.mapa.objektuak.protagonista = new Pertsona({
            src: skins[jsonfile.protagonista.skin],
            x: jsonfile.protagonista.x,
            y: jsonfile.protagonista.y,
            direkzioa: jsonfile.protagonista.direkzioa,
            kontrolatua: true,
            izena: jsonfile.protagonista.izena 
        })
        overworld.init()
    }
    loadMaps().then(loadSaved())   
})()

