class Mapa {
    constructor(config){
        this.imageUp = new Image()
        this.imageUp.src = config.srcUP || ''
        this.imageDown = new Image()
        this.imageDown.src = config.srcDOWN || ''
        this.okupatuta = config.okupatuta || []
        this.objektuak = config.objektuak || {}
        this.cutscene = false;
        this.cutsceneindex = 0;
        this.cutsceneslist = {};
        this.mapchanges = config.mapchanges;
    }
    init(){
        Object.values(this.objektuak).forEach(object => {
            object.mapa = this
        })
    }
    marraztubera(ctx, pertsona){
        let x = grid(10.5) - pertsona.xx
        let y = grid(6) - pertsona.yy
        ctx.drawImage(this.imageDown, x, y)
    }
    marraztugora(ctx, pertsona){
        let x = grid(10.5) - pertsona.xx
        let y = grid(6) - pertsona.yy
        ctx.drawImage(this.imageUp, x, y)
    }
    startCutscene(list){
        Window.mapa.objektuak.protagonista.kontrolatua = false;
        this.cutscene = true;
        let dir = list[this.cutsceneindex].dir
        let denbora = list[this.cutsceneindex].denbora
        let textua = list[this.cutsceneindex].textua
        let who = Window.mapa.objektuak[list[this.cutsceneindex].who]
        const funtzioa =(e)=>{
            if(e.detail.izena == who.izena){
                this.cutsceneindex ++
                if(this.cutsceneindex < list.length){
                    this.startCutscene(list)
                } else {
                    this.cutscene = false;
                    this.cutsceneindex = 0;
                    Window.mapa.objektuak.protagonista.kontrolatua = true;
                }
                document.removeEventListener('bukatuta', funtzioa)
            }
        }
        document.addEventListener('bukatuta', funtzioa)
        if (list[this.cutsceneindex].type == 'ibili'){
            who.ibili(dir);
        } else if (list[this.cutsceneindex].type == 'geldi'){
            who.geldi(denbora, dir)
        } else if (list[this.cutsceneindex].type == 'hitzein'){
            Window.textua.write(textua)
        }
    }
    set cutscenes(cutscn){
        let values = Object.values(cutscn)
        for(let x = 0; x < values.length; x ++){
            for(let i = 0; i < values[x].length; i ++){
                if (values[x][i].times){
                    let times = values[x][i].times
                    values[x][i].times = 1
                    for (let n = 0; n < times - 1; n++){
                        values[x].splice(i+1, 0, values[x][i])
                    }
                }
            }
        }
        this.cutsceneslist = cutscn
    }
    get cutscenes(){
        return this.cutsceneslist
    }
}

// Window.mapak = {
//     tolosa: new Mapa({
//         srcDOWN: './images/maps/izengabea.png',
//         okupatuta: ['[8,-1]','[9,-1]','[7,0]','[6,1]','[7,1]', '[17,3]', '[19,3]', '[16,3]', '[20,3]', '[21,3]','[22,3]','[15,3]','[22,2]','[22,1]','[21,1]','[20,1]','[19,1]','[18,1]','[17,1]','[16,1]','[15,1]', '[0,0]'],
//         objektuak: {
//             protagonista: new Pertsona({
//                 src: "./images/people/protagonista-mutila.png", 
//                 x: 5, 
//                 y: 4,
//                 kontrolatua: true,
//                 izena: 'protagonista'
//             }),
//             bestea: new Pertsona({
//                 src: "./images/people/protagonista-mutila.png",
//                 x: 3,
//                 y: 4,
//                 izena: 'bestea',
//                 textua: ['Kaixo, zer moduz zaude?', 'Zer nahi duzu?', 'Utzi pakean!'],
                // loop: [{
                //     type: 'ibili',
                //     dir: 'eskubi',
                // },{
                //     type: 'geldi',
                //     denbora: 500,
                //     dir: 'bera',
                // },{
                //     type: 'ibili',
                //     dir: 'bera',
                // },{
                //     type: 'geldi',
                //     denbora: 500,
                //     dir: 'ezkerra',
                // },{
                //     type: 'ibili',
                //     dir: 'ezkerra',
                // },{
                //     type: 'geldi',
                //     denbora: 500,
                //     dir: 'gora',
                // },{
                //     type: 'ibili',
                //     dir: 'gora',
                // },{
                //     type: 'geldi',
                //     denbora: 500,
                //     dir: 'eskubi',
                // },]
//              }),
//             besteaa: new Pertsona({
//                 src: "./images/people/protagonista-mutila.png",
//                 x: 7,
//                 y: 2,
//                 izena: 'besteaa',
//                 textua: ['Nere ratatta hoberena da.'],
                // loop: [{
                //     type: 'geldi',
                //     dir: 'bera',
                // }]
//             })
//         },    
//     }),
//     etxea: new Mapa({
//         srcDOWN: './images/maps/etxeaDOWN.png',
//         srcUP: './images/maps/etxeaUP.png',
//         okupatuta: ['[0,8]','[1,8]','[2,8]','[4,8]','[5,8]','[6,8]','[7,8]','[8,8]','[9,8]','[10,8]','[11,8]','[12,7]',
//         '[x,y]',],
//         objektuak: {
//             protagonista: new Pertsona({
//                 src: "./images/people/protagonista-mutila.png", 
//                 x: 5, 
//                 y: 5,
//                 kontrolatua: true,
//                 izena: 'protagonista'
//             }),
//             peter: new Pertsona({
//                 src: "./images/people/protagonista-mutila.png",
//                 x: 4,
//                 y: 4,
//                 izena: 'bestea',
//                 loop: [{
//                     type: 'ibili',
//                     dir: 'eskubi',
//                 },{
//                     type: 'geldi',
//                     denbora: 500,
//                     dir: 'bera',
//                 },{
//                     type: 'ibili',
//                     dir: 'bera',
//                 },{
//                     type: 'geldi',
//                     denbora: 500,
//                     dir: 'ezkerra',
//                 },{
//                     type: 'ibili',
//                     dir: 'ezkerra',
//                 },{
//                     type: 'geldi',
//                     denbora: 500,
//                     dir: 'gora',
//                 },{
//                     type: 'ibili',
//                     dir: 'gora',
//                 },{
//                     type: 'geldi',
//                     denbora: 500,
//                     dir: 'eskubi',
//                 },]
//             }),
//             amona: new Pertsona({
//                 src: "./images/people/protagonista-mutila.png",
//                 x: 8,
//                 y: 2,
//                 izena: 'besteaa'
//             })
//         }
//     })
// }

// Window.mapak.tolosa.cutscenes = {
//     '[12,3]': [{
//         who: Window.mapak.tolosa.objektuak.protagonista,
//         type: 'geldi',
//         dir: 'bera',
//         denbora: 10,
//     },{
//         who: Window.mapak.tolosa.objektuak.besteaa,
//         type: 'ibili',
//         dir: 'bera',
//         times: 2,
//     },{
//         who: Window.mapak.tolosa.objektuak.besteaa,
//         type: 'ibili',
//         dir: 'eskubi',
//         times: 5,
//     },{
//         who: Window.mapak.tolosa.objektuak.besteaa,
//         type: 'geldi',
//         dir: 'gora',
//         denbora: 0,
//     },{
//         type: 'hitzein',
//         textua: ['Ezin dezu hortik pasa.'],
//     },{
//         who: Window.mapak.tolosa.objektuak.besteaa,
//         type: 'ibili',
//         dir: 'ezkerra',
//         times: 5,
//     },{
//         who: Window.mapak.tolosa.objektuak.besteaa,
//         type: 'ibili',
//         dir: 'gora',
//         times: 2,
//     },{
//         who: Window.mapak.tolosa.objektuak.protagonista,
//         type: 'ibili',
//         dir: 'bera',
//     },{
//         who: Window.mapak.tolosa.objektuak.besteaa,
//         type: 'geldi',
//         dir: 'bera',
//         denbora: 0,
//     },]
// },

// Window.mapak.tolosa.mapchanges = {
//     '[18,3]': {nora: Window.mapak.etxea,
//                 protagonista: [3,7]}
// }

// Window.mapak.etxea.mapchanges = {
//     '[3,8]': {nora: Window.mapak.tolosa,
//         protagonista: [18,4]}
// }

// Window.mapa = Window.mapak.tolosa