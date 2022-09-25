class Textua {
    constructor(config){
        this.speed = config.speed || 20
        this.textua = document.querySelector('.jolas-edukiontzia').querySelector('#textua')
        this.done = false
        this.pantaia = document.querySelector('#textua')
        this.ctx = this.pantaia.getContext('2d');
        this.background = new Image()
        this.background.src = config.src || './images/TextBox.png'
    }

    write(text){
        Window.mapa.objektuak.protagonista.mugitzen = false;
        if (text.length > 0){
            this.esaldia(text[0])
            let funtzioa;
            let textcp = text.slice(1, text.length)
            if (text.length > 1){
                funtzioa = (e)=> {
                    if(e.key == 's'){
                        if(this.done){
                            this.write(textcp)
                            document.removeEventListener('keydown', funtzioa)
                        }
                    }
                }
            } else {
                funtzioa =(e)=>{
                    if (e.key == 's'){
                        if(this.done){
                            Window.mapa.cutscene = false;
                            this.ctx.clearRect(0, 0, this.pantaia.width, this.pantaia.height)
                            Window.keyInput.init()
                            document.removeEventListener('keydown', funtzioa)
                            const event = new CustomEvent('bukatuta')
                            document.dispatchEvent(event)
                        }
                    }
                }
                }
            document.addEventListener('keydown',funtzioa)
        }
    }

    esaldia(text){
        let i = 0
        let t = 8
        let funtzioa =(e)=>{
            if(e.key == 's'){
                for (i; i < text.length -1; i ++){
                    let div= document.createElement('div')
                    div.appendChild(document.createTextNode(text[i]))
                    this.textua.appendChild(div)
                }
            }
            document.removeEventListener('keydown', funtzioa)
        }
        document.addEventListener('keydown', funtzioa)

        this.done = false
        Window.mapa.cutscene = true;
        this.ctx.drawImage(this.background, 0, 0)
        this.ctx.font =  `13.05px pokemon`

        const writeletter=()=>{
            setTimeout(()=>{
                if(text[i]){
                    writeletter()
                    this.ctx.tex
                    this.ctx.fillText(text[i], t, 19)
                    console.log(text[i], t)
                    if (text[i] == ' ' || text[i] == 'l' || text[i] == '.' || text[i] == ';'){
                        t += 3
                    } else if (text[i] == 'i'){
                        t += 2
                    } else {
                        t += 6;
                    }
                    i++
                } else {
                    this.done = true
                }
            }, this.speed)
        }
        writeletter()
    }
}