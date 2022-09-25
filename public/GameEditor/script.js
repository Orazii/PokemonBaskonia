const mapak = document.querySelector('.mapak')
const map = document.querySelector('.map')
const grid = map.querySelector('table')
const gorde = document.querySelector('.gorde')
const options = document.querySelector('.options').querySelector('ul')
const optionslist = document.querySelector('.options').querySelector('ul').getElementsByTagName('li')

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
        } else if (mode == 'mapa-aldaketa'){
            document.querySelector('.formMap').style.display = 'block'
            document.querySelector('.formPerson').style.display = 'none'
        } else {
            document.querySelector('.formPerson').style.display = 'none'
            document.querySelector('.formMap').style.displayisplay = 'none'
        }
    });
}

let mode;
let maps;
let mapa;

//skin ezberdinak kargatu
const skins = {
    "protagonista-mutila": './images/people/protagonista-mutila.png',
    "protagonista-gorria": './images/people/protagonista-gorria.png',
    "protagonista-neska": './images/people/protagonista-neska.png',
    "n": './images/people/n.png',
    "ama": './images/people/ama.png'
}

Object.keys(skins).forEach(skin=>{
    var option = document.createElement('option') 
    option.innerHTML = skin;
    option.value = skin;
    document.querySelector('#skin').appendChild(option)
})

async function getMaps(){
    const response = await fetch("http://localhost:3000/mapak.json", {
        method: 'GET',
    })
    let jsonfile = await response.json()
    maps = jsonfile.mapak
    console.log(maps)
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
    //mapak lortu json fitxategitik    
    mapak.innerHTML= ''
    //mapa bakoitzarekin egin ____
    Object.keys(maps).forEach((key)=>{
        //botoi bat sortu
        var button = document.createElement('button')
        button.id = key
        button.innerHTML = key
        button.className = 'mapalista'
        mapak.appendChild(button)
        //botoiari eventoa jarri: klikatzerakoan mapa jarri pantaian
        mapak.querySelector(`#${key}`).addEventListener('click', ()=>{
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
                        td.id = `[${n},${i}]`
                        //mapan pareta badago belztu kasilla
                        if(maps[key].okupatuta.includes(td.id)){
                            td.className = 'pareta'
                        }
                        //kasilla klikatzerakoan
                        let clicktd=(mapaaldaketak)=>{
                            if(mode == 'paretak' ){
                                if(maps[key].okupatuta.includes(td.id)){
                                    td.className = '';
                                    index = maps[key].okupatuta.findIndex(x=>{return x == td.id})
                                    maps[key].okupatuta.splice(index, 1)
                                } else {
                                    td.className = 'pareta'
                                    maps[key].okupatuta.push(td.id)
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
                                console.log(key, mapto.value)
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
                        td.addEventListener('mouseover',(e)=>{
                            if(e.buttons == 1 || e.buttons == 3){
                                clicktd(false)
                            }
                        })
                        td.addEventListener('mousedown',()=>{
                            clear()
                            clicktd(true)
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
