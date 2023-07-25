class Overworld {
    constructor(config) {
        this.pantaia = config.pantaia
        this.ctx = this.pantaia.getContext('2d');
    }

    startGameLoop(){
        let pausoa =()=>{

            let w = window.innerWidth;
            let h = window.innerHeight;
            let scale;

            if (w/h > 352/240){
                scale = h/240 * 0.8;
            } else {
                scale = w/352 * 0.8;
            }

            let jolasedukiontzia = document.querySelector(".jolas-edukiontzia");
            jolasedukiontzia.style.transform = `scale(${scale})`;

            this.ctx.clearRect(0, 0, this.pantaia.width, this.pantaia.height)
            let objects = Object.values(window.mapa.objektuak)
            objects.sort(function(a,b){return a.y-b.y})
            if(`[${window.mapa.objektuak.protagonista.x},${window.mapa.objektuak.protagonista.y}]` in window.mapa.cutscenes){
                let funtzioa =(e)=>{
                    if(e.detail == window.mapa.objektuak.protagonista){
                        if(!window.mapa.cutscene){
                            window.mapa.startCutscene(window.mapa.cutscenes[`[${window.mapa.objektuak.protagonista.x},${window.mapa.objektuak.protagonista.y}]`])
                        }
                        document.removeEventListener('bukatuta', funtzioa)
                    }
                }
                document.addEventListener('bukatuta', funtzioa)
            }
            
            if(`[${window.mapa.objektuak.protagonista.x},${window.mapa.objektuak.protagonista.y}]` in window.mapa.mapchanges){
                if(!window.mapa.cutscene){
                    window.mapchange.changemap(window.mapa.mapchanges[`[${window.mapa.objektuak.protagonista.x},${window.mapa.objektuak.protagonista.y}]`])
                }
            }

            objects.forEach(object =>{
                object.update()
                object.mugitu(window.directionInput.direkzioa())
            })

            window.mapa.marraztubera(this.ctx, window.mapa.objektuak.protagonista)

            objects.forEach(object =>{
                object.marraztu(this.ctx, window.mapa.objektuak.protagonista)
            })
            window.mapa.marraztugora(this.ctx, window.mapa.objektuak.protagonista)
            requestAnimationFrame(pausoa)
            window.marraztu.forEach((element)=>{
                element.marraztu(this.ctx)
            })
        }
        pausoa()
    }

    init() {
        window.mapa.init()
        window.directionInput = new DirectionInput();
        window.directionInput.init();
        window.keyInput = new KeyInput();
        window.keyInput.init()
        window.textua = new Textua({ctx: this.ctx});
        window.menu = new Menu({});
        Object.values(window.mapak).forEach(mapa => {
            Object.values(mapa.objektuak).forEach(objektu=>{
                objektu.startBehavior()
            })
        })
        this.startGameLoop()
    }
}