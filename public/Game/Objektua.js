class Objektua {
    constructor(config){
        this.src = config.src
        this.image = new Image()
        this.image.src = `./images/objects/${this.src}.png`
        this.x = config.x || 0
        this.y = config.y || 0
        this.xx = grid(this.x)
        this.yy = grid(this.y)
        this.mapa = config.mapa
    }

    marraztu(ctx){

        ctx.drawImage(this.image, grid(this.x), grid(this.y))
        
    }
}