let removeButton = document.querySelector('.formMap').querySelector('.remove')

const removeMapchange =(coord, mapa)=>{
    Object.keys(maps[mapa].mapchanges).forEach(key=>{
        if (coord == key){
            console.log(key, maps[mapa].mapchanges[key])
            delete maps[mapa].mapchanges[key]
        }
    })
}

const clearMapchange =()=>{
    document.querySelector('#xnondik').value = '';
    document.querySelector('#ynondik').value = '';
    document.querySelector('#xnora').value = '';
    document.querySelector('#ynora').value = '';
    document.querySelector('#mapanora').value = '';   
    document.querySelector('#mapanondik').value = '';
}

const updateMapa =()=>{
    try {
        let mapfrom = document.querySelector('#mapanondik').value
        let xfrom = document.querySelector('#xnondik').value
        let yfrom = document.querySelector('#ynondik').value
        let coordJun = `[${xfrom},${yfrom}]`;
        let mapto = document.querySelector('#mapanora').value
        let xto = document.querySelector('#xnora').value
        let yto = document.querySelector('#ynora').value
        let coordBuelta = `[${xto},${yto}]`
        let bidirekzioak = document.querySelector('#bi-direkzioak').checked;

        formMapJun = {
            'nora' : mapto,
            'protagonista': [xto, yto]
        }
        formMapBuelta = {
            'nora' : mapfrom,
            'protagonista': [xfrom, yfrom]
        }
        if (xto&&yto&&xfrom&&yfrom&&mapto&&mapfrom){
            maps[mapfrom].mapchanges[coordJun] = formMapJun
            console.log(bidirekzioak)
            if(bidirekzioak){
                maps[mapto].mapchanges[coordBuelta] = formMapBuelta
            }
        }
    }catch(error){
        console.log(error)
    }
    try {
        //borratu kasilla guztiak
        tdak = document.getElementsByTagName('td')
        for(let i = 0; i < tdak.length; i++){
            try{
                tdak[i].querySelector('.mapchange').remove()
            }catch{}
        }
        //mapa aldaketa badago kasilla horitu
        Object.keys(maps[mapa].mapchanges).forEach(mapchange=>{
            try{
                td = document.getElementById(mapchange)
                div = document.createElement('div')
                div.className= 'mapchange'
                td.appendChild(div)
            } catch {

            }
            
        })
    } catch(error){
    }
    setTimeout(updateMapa, 500)
}
updateMapa()

removeButton.addEventListener('click', ()=>{
    let bidirekzioak = document.querySelector('#bi-direkzioak').checked;
    let coord = `[${document.querySelector('#xnondik').value},${document.querySelector('#ynondik').value}]`
    removeMapchange(coord, mapa)
    if (bidirekzioak){
        let coordBuelta = `[${document.querySelector('#xnora').value},${document.querySelector('#ynora').value}]`
        let mapto = document.querySelector('#mapanora').value
        console.log(mapto, maps[mapto])
        removeMapchange(coordBuelta, mapto)
    }
    clearMapchange()
})