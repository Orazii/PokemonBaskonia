class Textua {
    constructor(config){
        this.speed = config.speed || 30
        this.textua = document.querySelector('.jolas-edukiontzia').querySelector('#textua')
        this.done = false
        this.pantaia = document.querySelector('#textua')
        this.ctx = this.pantaia.getContext('2d');
        this.background = new Image()
        this.background.src = config.src || './images/TextBox.png'
    }
    remove(){
        window.mapa.cutscene = false;
        this.ctx.clearRect(0, 0, this.pantaia.width, this.pantaia.height)
        const event = new CustomEvent('bukatuta')
        document.dispatchEvent(event)
    }
    write(text, erantzuna = [], callback =()=>{}){
        window.mapa.objektuak.protagonista.mugitzen = false;
        window.mapa.cutscene = true;
        let sentences = text.length
        let sentence = 0
        let erantzunapick;

        document.addEventListener('done', ()=>{
            if(erantzuna.length > 0){
                erantzunapick = new Menu({x: 300, y: 200, width: 30, content: erantzuna})
                erantzunapick.open()
            }
        }, {once: true})

        let keyup =(e)=>{
            if(e.key == 'z'){
                this.speed = 40
                document.addEventListener('keydown', funtzioa)
            }
        }
        let funtzioa = (e)=>{
            if (e.key == 'z') {
                document.removeEventListener('keydown', funtzioa)
                if (this.done){
                    sentence += 1
                    console.log(sentence, sentences)
                    if (sentence < sentences){
                        this.esaldia(text[sentence])
                    } else {
                        window.keyInput.init()
                        document.removeEventListener('keydown', funtzioa)
                        document.removeEventListener('keyup', keyup)
                        if(erantzuna.length>0){
                            this.remove()
                            callback()
                            document.removeEventListener('keydown', funtzioa)
                            let erantzuna = erantzunapick.pick()
                            document.dispatchEvent(new CustomEvent('erantzuna', {detail: {erantzuna: erantzuna}}) )
                                
                        }else{
                            this.remove()
                            callback()
                            document.removeEventListener('keydown', funtzioa)
                        }
                    }
                } else {
                    this.speed = 10
                }
            }
        }
        if (sentences > 0){
            this.esaldia(text[sentence])
            document.addEventListener('keydown', funtzioa)
            document.addEventListener('keyup', keyup)
        }
    }

    esaldia(text){
        let i = 0
        let t = 8
        let stop = false
        console.log(text)

        this.done = false
        window.mapa.cutscene = true;
        this.ctx.drawImage(this.background, 0, 0)
        this.ctx.font =  `12.00px pokemon`
        document.addEventListener('deletetext', ()=>{
            stop = true
        })

        const writeletter=()=>{
            let timeout = setTimeout(()=>{
                if(text[i]){
                    writeletter()
                    this.ctx.fillText(text[i], t, 19)
                    if (text[i] == 'i' || text[i] == 'l' || text[i] == ' '  || text[i] == '.' || text[i] == ';'|| text[i] == ',' ){
                        t += 3
                    } else if (text[i] == 'f' || text[i] == 'j'|| text[i] == 'l'|| text[i] == 'n'|| text[i] == 'r'|| text[i] == 's'|| text[i] == 't'|| text[i] == 'k'){
                        t+=5
                    } else {
                        t += 6;
                    }
                    i++
                } else {
                    this.done = true
                    document.dispatchEvent(new Event('done'))
                }
            }, this.speed)
            if (stop){
                console.log('stopping')
                clearTimeout(timeout)
                return
            }
        }
        writeletter()
    }
}