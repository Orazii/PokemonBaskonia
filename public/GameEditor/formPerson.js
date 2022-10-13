let loop = document.querySelector('.loop')
let button = document.querySelector('.addbutton')
let irten = document.querySelector('.irten')
let formdiv = document.querySelector('.formPerson')
let removebutton = document.querySelector('.formPerson').querySelector('.remove')
let formPerson;

const removePerson =(name)=>{
        Object.keys(maps[mapa].objektuak).forEach(object=>{
            if (object ==name){
                delete maps[mapa].objektuak[object]
            }
        })
}
//clear formPerson
const clear =()=>{
    document.querySelector('#izena').value = ''
    document.querySelector('.textuak').innerHTML = ''
    document.querySelector('.loop').innerHTML = ''
    document.querySelector('.textuak').innerHTML = ''

    removePerson('')
}

//add loop div
const addLoop =(type, dir, denbora)=>{
    let div = document.createElement('div')
    let typeinput = document.createElement('select');
    typeinput.id = 'type'
    typeinput.innerHTML = `
    <option value="ibili">ibili</option>
    <option value="geldi">geldi</option>
    `
    typeinput.value = type
    let dirinput = document.createElement('select');
    dirinput.id = 'dir'
    dirinput.innerHTML = `
    <option value="gora">gora</option>
    <option value="bera">bera</option>
    <option value="ezkerra">ezkerra</option>
    <option value="eskubi">eskubi</option>
    `
    dirinput.value = dir
    let denborainput = document.createElement('input');
    denborainput.type = 'number'
    denborainput.className = 'number'
    denborainput.value = denbora
    div.appendChild(typeinput)
    div.appendChild(dirinput)
    div.appendChild(denborainput)
    loop.appendChild(div)
}
button.addEventListener('click', addLoop)

//remove person
removebutton.addEventListener('click', ()=>{
    let izena = document.querySelector('#izena').value;
    removePerson(izena);
    document.querySelector('#x').value = ''
    document.querySelector('#y').value = ''
    clear()
})

const update =()=>{
    try {
        let izena = document.querySelector('#izena').value
        let x = Number(document.querySelector('#x').value)
        let y = Number(document.querySelector('#y').value)
        var selectskin = document.getElementById('skin');
        var skin = selectskin.options[selectskin.selectedIndex].value;
        let kontrolatua = document.querySelector('#kontrolatua').checked;
        let textualist = document.querySelector('.textuak').querySelectorAll('input')
        let textua = []
        textualist.forEach((textu, index)=>{textua[index] = textu.value})
        let looplist = document.querySelector('.loop').querySelectorAll('div')
        let loop = []
        looplist.forEach((div, index)=>{
            let selecttype = div.querySelector('#type');
            let type = selecttype.options[selecttype.selectedIndex].value
            let selectdir = div.querySelector('#dir');
            let dir = selectdir.options[selectdir.selectedIndex].value
            let denbora = Number(div.querySelector('input').value)
            if(denbora){
                loop[index] = {
                    type,
                    dir,
                    denbora
                }
            } else {
                loop[index] = {
                    type,
                    dir,
                }
            }
        })
        formPerson = {
            x,
            y,
            skin,
            kontrolatua,
            textua,
            loop,
        }
        if(x){
            maps[mapa].objektuak[izena] = formPerson
        }
                
    } catch (error) {
        
    }
    try {
        //borratu pertsona guztiak
        tdak = document.getElementsByTagName('td')
        for(let i = 0; i < tdak.length; i++){
            try{
                tdak[i].querySelector('img').remove();
            }catch{}
        }
        objektuak = maps[mapa].objektuak;
        //mapan pertsona badago gehitu pertsona
        Object.values(objektuak).forEach(pertsona =>{
            td = document.getElementById(`[${pertsona.x},${pertsona.y}]`)
            var pertsonaimg = document.createElement('img')
            pertsonaimg.src = `../${skins[pertsona.skin]}`
            pertsonaimg.setAttribute('draggable', 'false');
            td.appendChild(pertsonaimg)
        })
    } catch (error) {
    }
    setTimeout(update, 500)
}
update()