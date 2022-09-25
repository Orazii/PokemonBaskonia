class KeyInput {
    constructor(){
        this.funtzioa = (e)=>{
            if(e.key == 's'){
                this.dir = Window.mapa.objektuak.protagonista.direkzioa
                this.x = Window.mapa.objektuak.protagonista.xx
                this.y = Window.mapa.objektuak.protagonista.yy
                let x;
                let y;
                let dir;
                if(this.dir == 'eskubi'){
                    x = this.x + 16
                    y = this.y
                    dir = 'ezkerra'
                } else if (this.dir == 'ezkerra'){
                    x = this.x - 16
                    y = this.y
                    dir = 'eskubi'
                } else if (this.dir == 'gora'){
                    x = this.x
                    y = this.y - 16
                    dir = 'bera'
                } else if (this.dir == 'bera'){
                    x = this.x
                    y = this.y + 16
                    dir = 'gora'
                }

                let objects = Object.values(Window.mapa.objektuak)
                objects.forEach(object =>{
                    if (x == object.xx && y == object.yy){
                        object.direkzioa = dir
                        if(object.textua != ''){
                            document.removeEventListener('keydown', this.funtzioa)
                            object.talk()
                        }
                    }
                })

            }
        }
    }
    init(){
        document.addEventListener('keydown', this.funtzioa)
    }
}