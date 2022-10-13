class DirectionInput {
    constructor(){
        this.zapaldutakoDirekzioak = []
        this.legenda = {
            'ArrowUp' : 'gora',
            'ArrowDown' : 'bera',
            'ArrowLeft' : 'ezkerra',
            'ArrowRight' : 'eskubi',
        }
    }

    direkzioa(){
        return this.zapaldutakoDirekzioak[0]
    }

    init(){
        document.addEventListener('keydown', e => {
            const dir = this.legenda[e.code]
            if (dir && this.zapaldutakoDirekzioak.indexOf(dir) === -1){
                this.zapaldutakoDirekzioak.unshift(dir)
            }
        })
        document.addEventListener('keyup', e => {
            const dir = this.legenda[e.code]
            if(this.zapaldutakoDirekzioak.indexOf(dir) != -1){
                this.zapaldutakoDirekzioak.splice(this.zapaldutakoDirekzioak.indexOf(dir), 1)
            }
        })
    }
}