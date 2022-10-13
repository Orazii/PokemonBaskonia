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
        this.izena = config.izena;
        this.nun = config.nun;
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
        try{
            ctx.drawImage(this.imageUp, x, y)
        }catch{}
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