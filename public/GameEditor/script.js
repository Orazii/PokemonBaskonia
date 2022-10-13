const mapak = document.querySelector('.mapakbarrua')
const map = document.querySelector('.map')
const grid = map.querySelector('table')
const gorde = document.querySelector('.gorde')
const options = document.querySelector('.options').querySelector('ul')
const optionslist = document.querySelector('.options').querySelector('ul').getElementsByTagName('li')
const paretaslide = document.querySelector('.paretaslide')

paretaslide.oninput=()=>{
    document.querySelectorAll('.pareta').forEach((pareta)=>{
        pareta.style.opacity = paretaslide.value/100
    })
}
//botoiak aukeratzerakoan aldatzeko estiloa
const select=(selected, group)=>{
    if(group.querySelector('.selected')){
        group.querySelector('.selected').classList.remove('selected')
    }
    selected.classList.add('selected')
}

//editatzeko aukera ezberdinak. Adib: paretak, pertsonak...
for(let i = 0; i < optionslist.length; i++){
    optionslist[i].addEventListener('click', ()=>{
        select(optionslist[i], options);
        mode = optionslist[i].id
        if (mode == 'pertsonak') {
            document.querySelector('.formPerson').style.display = 'block'
            document.querySelector('.formMap').style.display = 'none'
            document.querySelector('.formNewMap').style.display = 'none'
        } else if (mode == 'mapa-aldaketa'){
            document.querySelector('.formMap').style.display = 'block'
            document.querySelector('.formPerson').style.display = 'none'
            document.querySelector('.formNewMap').style.display = 'none'
        } else {
            document.querySelector('.formPerson').style.display = 'none'
            document.querySelector('.formMap').style.display= 'none'
            document.querySelector('.formNewMap').style.display = 'none'
        }
    });
}
let showmapform=()=>{
    document.querySelector('.formPerson').style.display = 'none'
    document.querySelector('.formMap').style.display= 'none'
    document.querySelector('.formNewMap').style.display = 'block'
}

let mode;
let maps;
let mapa;

//skin ezberdinak kargatu
let skins = {}
async function getSkins(){
    const response = await fetch("http://localhost:3000/images/people", {
        method: 'GET',
    })
    let files = await response.json()
    files.files.forEach((file)=>{
        skins[file.match('(.*)(?=.png)')[0]] = './images/people/' + file
    })
}
const loadMapSkins=()=>{
    document.querySelector('#skin').innerHTML = '';
    Object.keys(skins).forEach(skin=>{
        var option = document.createElement('option') 
        option.innerHTML = skin;
        option.value = skin;
        document.querySelector('#skin').appendChild(option)
    })
}
getSkins().then(loadMapSkins())
let mapskins = {}
async function getMapSkins(){
    const response = await fetch("http://localhost:3000/images/maps", {
        method: 'GET',
    })
    let files = await response.json()
    files.files.forEach((file)=>{
        if(file.match('DOWN.png')){
            mapskins[file.match('(.*)(?=(DOWN)|(UP).png)')[0]] = './images/maps/' + file
        }
    })
}
getMapSkins().then(()=>{
    Object.keys(mapskins).forEach(skin=>{
        var option = document.createElement('option') 
        option.innerHTML = skin;
        option.value = skin;
        document.querySelector('#mapskin').appendChild(option)
    })
})

async function getMaps(){
    const response = await fetch("http://localhost:3000/Game/mapak.json", {
        method: 'GET',
    })
    let jsonfile = await response.json()
    maps = jsonfile.mapak
    Object.keys(maps).forEach(map=>{
        var option = document.createElement('option')
        option.innerHTML = map;
        option.value = map;
        document.querySelector('#mapanondik').appendChild(option)
        var optionnora = document.createElement('option')
        optionnora.innerHTML = map;
        optionnora.value = map;
        document.querySelector('#mapanora').appendChild(optionnora)
    })
}

function loadMaps(){
    //borratu
    mapak.innerHTML = ""
    //mapa bakoitzarekin egin ____
    Object.keys(maps).forEach((key)=>{
        //botoi bat sortu
        var button = document.createElement('button')
        button.id = key
        button.innerHTML = key
        button.className = 'mapalista'
        button.classList.add('nun')
        if(document.querySelector(`.${maps[key].nun}`) == undefined){
            var div = document.createElement('div')
            div.className = maps[key].nun
            mapak.appendChild(div)
        }
        var div = document.querySelector(`.${maps[key].nun}`)
        if (maps[key].nun == key){
            button.classList.add('out')
            var option = document.createElement('option') 
            option.innerHTML = key;
            option.value = key;
            document.querySelector('#nun').appendChild(option)
        } else {
            button.classList.add('in')
        }
        div.appendChild(button)
        //botoiari eventoa jarri: klikatzerakoan mapa jarri pantaian
        mapak.querySelector(`#${key}`).addEventListener('click', ()=>{
            borratu.style.display = 'block'
            gehitu.style.display = 'none'
            //aukeratutako mapa aukeratu
            mapa = key
            //estiloa aldatu botoiari
            select(mapak.querySelector(`#${key}`), mapak)
            //mapa pantaian jarri
            var image = document.createElement('img')
            image.className = 'mapa'
            image.src = `../${maps[key].srcDOWN}`
            image.setAttribute('draggable', 'false')
            if(map.querySelector('.mapa')){
                map.removeChild(map.querySelector('.mapa'))
            }
            map.appendChild(image)
            //formularioa bete datuekin
            showmapform()
            document.querySelector('#mapaizena').value = key
            document.querySelector('#nun').value = maps[key].nun
            let src = maps[key].srcDOWN
            document.querySelector('#mapskin').value = src.match('(?<=maps\/).*(?=(DOWN)|(UP).png)')[0]
            //taula gehitu            
            grid.innerHTML = ''
            image.onload =()=>{
                x = Math.round(image.width/16)
                y = Math.round(image.height/16)
                grid.style.width = (image.width - image.width % 16) + 'px';
                for(let i = 0; i < y; i++){
                    let row = document.createElement('tr');
                    grid.appendChild(row);
                    for(let n = 0; n < x; n ++){
                        let td = document.createElement('td');
                        td.setAttribute('draggable', false);
                        td.id = `[${n},${i}]`
                        td.aldatuta = false;
                        //mapan pareta badago belztu kasilla
                        if(maps[key].okupatuta.includes(td.id)){
                            div = document.createElement('div')
                            div.className = 'pareta'
                            td.appendChild(div)
                        }
                        //kasilla klikatzerakoan
                        let clicktd=(mapaaldaketak)=>{
                            if(mode == 'paretak' ){
                                if(!td.aldatuta){
                                    if(!maps[key].okupatuta.includes(td.id)){
                                        console.log('adding square')
                                        div = document.createElement('div')
                                        div.className = 'pareta'
                                        td.appendChild(div)
                                        maps[key].okupatuta.push(td.id)  
                                    }else{
                                        td.querySelector('.pareta').remove()
                                        index = maps[key].okupatuta.findIndex(x=>{return x == td.id})
                                        maps[key].okupatuta.splice(index, 1)
                                    }
                                    td.aldatuta = true;
                                }
                            } else if (mode == 'pertsonak'){
                                Object.keys(maps[key].objektuak).forEach(pertsona =>{
                                    if (maps[key].objektuak[pertsona].x == n && maps[key].objektuak[pertsona].y == i){
                                        document.querySelector('#izena').value = pertsona
                                        maps[key].objektuak[pertsona].textua.forEach(text => {
                                            let txt =document.createElement('input');
                                            txt.type = 'text';
                                            txt.value = text;
                                            document.querySelector('.textuak').innerHTML = ''
                                            document.querySelector('.textuak').appendChild(txt)
                                            document.querySelector('.textuak').appendChild(document.createElement('br'))
                                        })
                                        let loopList = maps[key].objektuak[pertsona].loop
                                        document.querySelector('.loop').innerHTML = ''
                                        loopList.forEach(loop=>{
                                            addLoop(loop.type, loop.dir, loop.denbora)
                                        })
                                        document.querySelector('#kontrolatua').checked = maps[key].objektuak[pertsona].kontrolatua
                                        document.querySelector('#skin').value = maps[key].objektuak[pertsona].skin                                   
                                    }
                                })
                                document.querySelector('#x').value = n
                                document.querySelector('#y').value = i
                            } else if (mode == 'mapa-aldaketa' && mapaaldaketak){
                                let xfrom = document.querySelector('#xnondik')
                                let yfrom = document.querySelector('#ynondik')
                                let xto = document.querySelector('#xnora')
                                let yto = document.querySelector('#ynora')
                                let mapto = document.querySelector('#mapanora')
                                let mapfrom = document.querySelector('#mapanondik')
                                if(key == mapto.value){
                                    xto.value = n
                                    yto.value = i
                                } else {
                                    mapfrom.value = key
                                    xfrom.value = n
                                    yfrom.value = i    
                                }

                                Object.entries(maps[key].mapchanges).forEach(([coord, value])=>{
                                    let [ixa, igrekoa] = JSON.parse(coord)
                                    //koordenadak berdinak badira
                                    if (ixa == n && igrekoa == i) {
                                        mapto.value = maps[key].mapchanges[coord].nora
                                        xto.value = maps[key].mapchanges[coord].protagonista[0]
                                        yto.value = maps[key].mapchanges[coord].protagonista[1]
                                        xfrom.value = ixa
                                        yfrom.value = igrekoa
                                        mapfrom.value = key                                        
                                    }
                                })
                            }
                        }
                        const tdmouseover =(e)=>{
                            if(e.buttons == 1 || e.buttons == 3){
                                console.log('mouseover')
                                clicktd(false)
                            }
                        }
                        
                        td.addEventListener('mouseover',tdmouseover)
                        const tdlistener =()=>{
                            console.log('tdclicked')
                            clicktd(true)
                        }
                        td.addEventListener('click', tdlistener)
                        td.addEventListener('mouseleave', ()=>{
                            td.aldatuta = false
                        })

                        row.appendChild(td);
                    }
            }
            
            }
        })
    })
}

getMaps().then(loadMaps)
async function post(){
    console.log(maps)
    const rawResponse = await fetch('http://localhost:3000/update', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(maps)
        });
        const content = await rawResponse.json();
}
gorde.addEventListener('click', (e)=>{  
    removePerson('')
    removeMapchange('[,]', mapa)
    post()
})
document.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        
    }
})
