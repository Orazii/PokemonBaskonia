class Save{
    constructor(config){
        console.log('creating save')
        this.mapa = Window.mapa;
        this.dominak = Window.saved.dominak;
        let segunduak = Window.saved.denbora;
        let minutuak = Math.floor(segunduak /60)
        let orduak = Math.floor(minutuak / 60)
        minutuak = (minutuak - orduak*60).toLocaleString(undefined, {minimumIntegerDigits: 2})
        this.denbora = `${orduak}:${minutuak}`
        this.img = new Image();
        this.img.src= config.img || './images/window/menu.png';
    }
    marraztu(ctx){
        let x = 2;
        let y = 2;
        let width = 150;
        let height = 85;
        let space = 16;

        drawSquare(x, y, width, height, this.img, ctx)
        ctx.fillStyle = "blue";
        ctx.font = `12.05px pokemon` 
        ctx.textAlign = 'center';
        ctx.fillText(this.mapa.nun.toUpperCase(), x+7+width/2, y+20)
        ctx.textAlign = 'left';
        ctx.fillStyle = "#616161";
        ctx.fillText('IZENA', x+9, y + 20 + space)        
        ctx.fillText(Window.mapa.objektuak.protagonista.izena, x+7+width/2, y + 20 + space)
        ctx.fillText('DOMINAK', x+9, y+20+space*2)
        ctx.fillText(this.dominak.length, x+7+width/2, y+20+space*2)
        ctx.fillText('DENBORA', x+9, y+20+space*3)
        ctx.fillText(this.denbora, x+7+width/2, y+20+space*3)
    }
    async post(saved){
        const rawResponse = await fetch('http://localhost:3000/saved', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(saved)
            });
        document.dispatchEvent(new CustomEvent('deletetext'))
        setTimeout(()=>{
            Window.textua.write([`Jokua gorde duzu.`], [], ()=>{
                marrazturemove(this)
            })
        }, 10)           
    }
    init(){
        Window.marraztu.push(this);
        Window.textua.write(['Jolasa gorde nahi al duzu?'],['BAI', 'EZ']);
        let erantzuna=e=>{
            if(e.detail.erantzuna == 'BAI'){
                Window.textua.remove()
                Window.textua.esaldia('Gordetzen... Ez atera jolasetik.')
                let protagonista = Window.mapa.objektuak.protagonista
                let saved = {
                    mapa: Window.mapa.izena,
                    protagonista: {
                        izena: protagonista.izena,
                        skin: protagonista.src,
                        dir: protagonista.direkzioa,
                        x: protagonista.x,
                        y: protagonista.y
                    },
                    dominak: Window.saved.dominak,
                    denbora: Window.saved.denbora
                }
                this.post(saved)
            } else if(e.detail.erantzuna=='EZ'){
                marrazturemove(this)
            }
            document.removeEventListener('erantzuna', erantzuna)
        }
        document.addEventListener('erantzuna', erantzuna)
    }
}