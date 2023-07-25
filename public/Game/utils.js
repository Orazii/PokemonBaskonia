grid = (n) => {
    return n*16
}

drawSquare=(x, y, width, height, img, ctx)=>{
    //upside
    ctx.drawImage(img, 0, 0, 7, 7, x, y, 7, 7)
    ctx.drawImage(img, 7, 0, 10, 7, x+7, y, width, 7)
    ctx.drawImage(img, img.width-7, 0, 7, 7, x+7+width, y, 7, 7)
    //left
    ctx.drawImage(img, 0, 7, 7, 10, x, y+7, 7, height)
    //right
    ctx.drawImage(img, img.width-7, 7, 7, 10, x+7+width, y+7, 7, height)
    //fill
    ctx.drawImage(img, 7, 7, 7, 7, x+7, y+7, width, height)
    //bottom
    ctx.drawImage(img, 0, img.height-7, 7, 7, x, y+7+height, 7, 7 )
    ctx.drawImage(img, 7, img.height-7, 10, 7, x+7, y+7+height, width, 7)
    ctx.drawImage(img, img.width-7, img.height-7, 7, 7, x+7+width, y+7+height, 7, 7)
}

marrazturemove=(a)=>{
    window.marraztu.splice(window.marraztu.indexOf(a), 1)

}