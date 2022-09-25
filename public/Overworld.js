class Overworld {
    constructor(config) {
        this.pantaia = config.pantaia
        this.ctx = this.pantaia.getContext('2d');
    }

    startGameLoop(){
        let pausoa =()=>{
            this.ctx.clearRect(0, 0, this.pantaia.width, this.pantaia.height)
            let objects = Object.values(Window.mapa.objektuak)
            objects.sort(function(a,b){return a.y-b.y})

            if(`[${Window.mapa.objektuak.protagonista.x},${Window.mapa.objektuak.protagonista.y}]` in Window.mapa.cutscenes){
                let funtzioa =(e)=>{
                    if(e.detail == Window.mapa.objektuak.protagonista){
                        if(!Window.mapa.cutscene){
                            Window.mapa.startCutscene(Window.mapa.cutscenes[`[${Window.mapa.objektuak.protagonista.x},${Window.mapa.objektuak.protagonista.y}]`])
                        }
                        document.removeEventListener('bukatuta', funtzioa)
                    }
                }
                document.addEventListener('bukatuta', funtzioa)
            }
            
            if(`[${Window.mapa.objektuak.protagonista.x},${Window.mapa.objektuak.protagonista.y}]` in Window.mapa.mapchanges){
                if(!Window.mapa.cutscene){
                    Window.mapchange.changemap(Window.mapa.mapchanges[`[${Window.mapa.objektuak.protagonista.x},${Window.mapa.objektuak.protagonista.y}]`])
                }
            }

            objects.forEach(object =>{
                object.update()
                object.mugitu(this.directionInput.direkzioa())
            })

            Window.mapa.marraztubera(this.ctx, Window.mapa.objektuak.protagonista)

            objects.forEach(object =>{
                object.marraztu(this.ctx, Window.mapa.objektuak.protagonista)
            })
            Window.mapa.marraztugora(this.ctx, Window.mapa.objektuak.protagonista)
            requestAnimationFrame(pausoa)
        }
        pausoa()
    }

    init() {
        Window.mapa.init()
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        Window.keyInput = new KeyInput();
        Window.keyInput.init()
        Window.textua = new Textua({ctx: this.ctx});
        Object.values(Window.mapak).forEach(mapa => {
            Object.values(mapa.objektuak).forEach(objektu=>{
                objektu.startBehavior()
            })
        })
        this.startGameLoop()
    }
}