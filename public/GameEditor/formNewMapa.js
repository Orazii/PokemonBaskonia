const borratu = document.querySelector('.formNewMap').querySelector('.remove')
const mapagehi = document.querySelector('.gehi')
const gehitu = document.querySelector('.add')
// document.querySelector('#mapaizena').value = key
//             document.querySelector('#nun').value = maps[key].nun
//             let src = maps[key].srcDOWN
//             console.log(src, src.match('(?<=maps\/).*(?=(DOWN)|(UP).png)')[0])
//             document.querySelector('#mapskin').value = sr

borratu.addEventListener('click', ()=>{
    if(confirm('Seguru borratu nahi duzula?')){
        delete maps[document.querySelector('#mapaizena').value]
        Object.keys(maps).forEach(map=>{
            if (maps[map].nun == document.querySelector('#mapaizena').value){
                maps[map].nun = map
            }
        })
        loadMaps()
        loadMapSkins()
    }else{

    }
})
console.log(mapagehi)
gehitu.addEventListener('click', ()=>{
    let izena = document.querySelector('#mapaizena').value;
    let nun = document.querySelector('#nun').value
    let skin = document.querySelector('#mapskin').value
    if(izena!=''){
        if(nun == ''){
            nun = izena   
        }
        maps[izena] = {
            izena,
            nun,
            srcDOWN: `./images/maps/${skin}DOWN.png`,
            srcUP: `./images/maps/${skin}UP.png`, 
            okupatuta: [],
            cutscenes: {},
            objektuak: {},
            mapchanges: {},
        }
        loadMaps()
        loadMapSkins()
        
    } else {
        Window.alert('Jarri izena mapari')
    }
})
mapagehi.addEventListener('click', ()=>{
    showmapform()
    borratu.style.display = 'none'
    gehitu.style.display = 'block'
})
