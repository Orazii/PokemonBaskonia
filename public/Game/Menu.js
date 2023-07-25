class Menu {
    constructor(config){
        this.img = new Image();
        this.img.src= config.img || './images/window/menu.png';
        this.content = config.content||['POKéDEX', 'POKéMON', 'MOTXILA', 'GORDE', 'ATERA']
        this.arrowimg = new Image();
        this.arrowimg.src = config.arrowimg || './images/window/fletxa.png';
        this.selected = 0;
        this.opened = false;
        this.x = config.x || 277
        this.y = config.y || 1
        this.width = config.width || 60

        document.addEventListener('keydown', (e)=>{
            if(e.key =='ArrowUp'){
                if (this.opened){
                    this.selected -= 1;
                    if(this.selected < 0){
                        this.selected = this.content.length -1;
                    }
                }                   
            } else if(e.key == 'ArrowDown'){
                if(this.opened){
                    this.selected += 1;
                    if(this.selected >= this.content.length){
                        this.selected = 0;
                    }
                }
            }
        })
    };
    open(){
        window.marraztu.push(this)
        this.opened = true
        window.mapa.objektuak.protagonista.kontrolatua = false
    }
    close(){
        window.marraztu.splice(window.marraztu.indexOf(this), 1)
        this.opened = false
        window.mapa.objektuak.protagonista.kontrolatua = true
    }
    marraztu(ctx){
        let x = 277
        let y = 1
        let width = 60
        let height = (this.content.length -1)*16 + 14

        drawSquare(x, y, width, height, this.img, ctx)

        //DRAW TEXT
        let z = y +18
        let t = x+17
        ctx.fillStyle = "#616161";
        ctx.font = `12.05px pokemon`
        for (let i = 0; i<this.content.length; i++){
            ctx.fillText(this.content[i], t, z);
            z += 16
        }

        //DRAW ARROW
        ctx.drawImage(this.arrowimg, x+8, y + 6 +(this.selected)*16)
      
    };
    pick(){
        this.close()
        let aukera = this.content[this.selected];
        if(this == window.menu){
            if (aukera == 'GORDE'){
                window.save = new Save({});
                window.save.init();
            }
        }  
        return aukera      
    }
}