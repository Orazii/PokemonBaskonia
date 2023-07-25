class KeyInput {
    constructor(){
        this.funtzioa = (e)=>{
            if(!window.mapa.cutscene){
                console.log(e.key)
                if(e.key == 'z'){
                    if(window.menu.opened){
                        window.menu.pick()
                    } else {
                        //protagonista non eta zer direkziotan dago
                        this.dir = window.mapa.objektuak.protagonista.direkzioa
                        this.x = window.mapa.objektuak.protagonista.xx
                        this.y = window.mapa.objektuak.protagonista.yy
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
                        //norbait protagonistaren ondoan badago hitz egin
                        let objects = Object.values(window.mapa.objektuak)
                        objects.forEach(object =>{
                            if (x == object.xx && y == object.yy){
                                object.direkzioa = dir
                                if(object.textua != ''){
                                    object.talk()
                                }
                            }
                        })
                    }
    
                } else if (e.key == 'Enter'){
                    if(window.menu.opened){
                        window.menu.close();
                        
                    } else {
                        window.menu.open();
                    }
                } else if (e.key == 'x'){
                    if (window.menu.opened){
                        window.menu.exit();
                    }
                }
            }
        }
    }
    init(){
        document.addEventListener('keydown', this.funtzioa)
    }
}