class KeyInput {
    constructor(){
        this.funtzioa = (e)=>{
            if(!Window.mapa.cutscene){
                if(e.key == 's'){
                    if(Window.menu.opened){
                        Window.menu.pick()
                    } else {
                        //protagonista non eta zer direkziotan dago
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
                        //norbait protagonistaren ondoan badago hitz egin
                        let objects = Object.values(Window.mapa.objektuak)
                        objects.forEach(object =>{
                            if (x == object.xx && y == object.yy){
                                object.direkzioa = dir
                                if(object.textua != ''){
                                    object.talk()
                                }
                            }
                        })
                    }
    
                } else if (e.key == 'x'){
                    if(Window.menu.opened){
                        Window.menu.close();
                        
                    } else {
                        Window.menu.open();
                    }
                }
            }
        }
    }
    init(){
        document.addEventListener('keydown', this.funtzioa)
    }
}