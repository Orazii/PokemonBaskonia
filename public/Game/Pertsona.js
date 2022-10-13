class Pertsona extends Objektua {
    constructor(config){
        super(config)
        this.izena = config.izena
        this.mugimenduaFaltan = 0
        this.direkzioa = config.direkzioa || 'bera'
        this.animazioabiadura = 10
        this.animazioIndex = 0
        this.animazioa = 0
        this.mugitzen = false
        this.kontrolatua = config.kontrolatua || false
        this.loop = config.loop || []
        this.loopindex = 0
        this.textua = config.textua || []
        this.image.src = `./images/people/${this.src}.png`
        this.bira = false
    }

    marraztu(ctx, pertsona){
        if (this.mugitzen){
            this.animazioIndex ++
            if (this.animazioIndex >= this.animazioabiadura){
                this.animazioa ++
                if(this.animazioa > 3) {
                    this.animazioa = 0
                }
                this.animazioIndex = 0
            }
        } else {
            this.animazioIndex = 0
            this.animazioa = 0
        }
        let x = this.xx + grid(10.5) - pertsona.xx;
        let y = this.yy + grid(6) - pertsona.yy - 10;
        if (this.direkzioa == 'eskubi'){
            ctx.drawImage(this.image, this.animazioa * 16, 2*24, 16, 24, x, y, 16, 24)
        } else if (this.direkzioa == 'ezkerra'){
            ctx.drawImage(this.image, this.animazioa * 16, 1*24, 16, 24, x, y, 16, 24)
        } else if (this.direkzioa == 'gora'){
            ctx.drawImage(this.image, this.animazioa * 16, 3*24, 16, 24, x, y, 16, 24)
        } else if (this.direkzioa == 'bera'){
            ctx.drawImage(this.image, this.animazioa * 16, 0, 16, 24, x, y, 16, 24)
        }
    }

    mugitu(dir){
        if (this.kontrolatua && !Window.mapa.cutscene){
            if(!this.mugimenduaFaltan > 0 && !this.stop){
                if (dir){
                    this.ibili(dir)                  
                } else {
                    this.mugitzen = false
                } 
            }
        } 
    }
    direkzioa(dir){
        if (this.kontrolatua && !Window.mapa.cutscene){
            this.direkzioa = dir
        }
    }

    ibili(dir){
        if(this.kontrolatua && this.direkzioa != dir && Window.directionInput.zapaldutakoDirekzioak.length == 1 && this.mugitzen == false){
            this.bira = true
            this.mugimenduaFaltan = 8
            this.direkzioa = dir
            return 
        }
        this.mugitzen = true
        this.direkzioa = dir
        if (dir == 'gora'){
            if(!Window.mapa.okupatuta.includes(`[${this.x},${this.y-1}]`)){
                if(Window.mapa.okupatuta.includes(`[${this.x},${this.y}]`)){
                    Window.mapa.okupatuta.splice(Window.mapa.okupatuta.indexOf(`[${this.x},${this.y}]`),1)
                }
                this.y --
                this.mugimenduaFaltan = 16
            } else if (!this.kontrolatua){
                setTimeout(()=>{this.ibili(dir)}, 1000)
            }
        } else if (dir == 'bera'){
            if(!Window.mapa.okupatuta.includes(`[${this.x},${this.y+1}]`)){
                if(Window.mapa.okupatuta.includes(`[${this.x},${this.y}]`)){
                    Window.mapa.okupatuta.splice(Window.mapa.okupatuta.indexOf(`[${this.x},${this.y}]`),1)
                }
                this.y ++
                this.mugimenduaFaltan = 16
            } else if (!this.kontrolatua){
                setTimeout(()=>{this.ibili(dir)}, 1000)
            }
        } else if (dir == 'eskubi'){
            if(!Window.mapa.okupatuta.includes(`[${this.x+1},${this.y}]`)){
                if(Window.mapa.okupatuta.includes(`[${this.x},${this.y}]`)){
                    Window.mapa.okupatuta.splice(Window.mapa.okupatuta.indexOf(`[${this.x},${this.y}]`),1)
                }
                this.x ++
                this.mugimenduaFaltan = 16
            } else if (!this.kontrolatua){
                setTimeout(()=>{this.ibili(dir)}, 1000)
            }
        } else if (dir == 'ezkerra'){
            if(!Window.mapa.okupatuta.includes(`[${this.x-1},${this.y}]`)){
                if(Window.mapa.okupatuta.includes(`[${this.x},${this.y}]`)){
                    Window.mapa.okupatuta.splice(Window.mapa.okupatuta.indexOf(`[${this.x},${this.y}]`),1)
                }
                this.x --
                this.mugimenduaFaltan = 16
            } else if (!this.kontrolatua){
                setTimeout(()=>{this.ibili(dir)}, 1000)
            }
        }
    }

    geldi(denbora, dir){
        this.direkzioa = dir
        this.mugitzen = false
        setTimeout(()=>{
            const geldibukatuta = new CustomEvent('bukatuta', {detail: this})
            document.dispatchEvent(geldibukatuta)
        },denbora)
    }

    update(){
        if(!Window.mapchange.transitioning){
            if(!Window.mapa.okupatuta.includes(`[${this.x},${this.y}]`)){
                Window.mapa.okupatuta.push(`[${this.x},${this.y}]`)
            }
        }
        if(this.mugimenduaFaltan > 0){
            if (this.bira){
            } else if (this.direkzioa == 'eskubi'){
                this.xx ++
            } else if (this.direkzioa == 'ezkerra'){
                this.xx --
            } else if (this.direkzioa == 'gora'){
                this.yy --
            } else if (this.direkzioa == 'bera'){
                this.yy ++
            }
            this.mugimenduaFaltan --
            if (this.mugimenduaFaltan == 0){
                this.bira = false
                const ibiltzenbukatuta = new CustomEvent('bukatuta', {detail: this})
                document.dispatchEvent(ibiltzenbukatuta)
            }
        } else {
            if(!this.kontrolatua){
                this.mugitzen = false
            }
        }
    }

    startBehavior(){
        if(this.loop.length > 0){
            if(!Window.mapa.cutscene){
                const funtzioa =(e)=>{
                    if(e.detail == this){
                        this.loopindex ++
                        if(this.loopindex >= this.loop.length){
                            this.loopindex = 0;
                        }
                        this.startBehavior()
                        document.removeEventListener('bukatuta', funtzioa)
                    }
                }
                document.addEventListener('bukatuta', funtzioa)
                let dir = this.loop[this.loopindex].dir
                let denbora = this.loop[this.loopindex].denbora
                if (this.loop[this.loopindex].type == 'ibili'){
                    this.ibili(dir)
                } else if (this.loop[this.loopindex].type == 'geldi'){
                    if (!denbora){
                        denbora = 0
                    }
                    this.geldi(denbora, dir)
                }
            } else {
                setTimeout(()=>{this.startBehavior()}, 1000)
            }
        }      
    }

    talk(){
        if(!Window.mapa.cutscene){
            if (this.textua){
                Window.textua.write(this.textua)
            }
        }
    }
}