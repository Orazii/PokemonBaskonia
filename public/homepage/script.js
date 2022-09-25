let title = document.querySelector('.titleimg')
let back = document.querySelector('.back')
let form = document.querySelector('.formulario')
let formbarrua = document.querySelector('.formulariobarrua')
let formcontainer = document.querySelector('.formcontainer')
let submit = document.querySelector('.sartu')
const message = document.querySelector('.message')

let timeout; 
title.addEventListener('mouseover', ()=>{
    console.log('mouseover')
    timeout = setTimeout(()=>{
        console.log('2 seconds')
        title.classList.add('hover')
        setTimeout(()=>{
            formcontainer.style.display = 'grid';
            back.style.display = 'block';
            setTimeout(()=>{
                form.style.height = '200px';
                setTimeout(()=>{
                    formbarrua.style.opacity = 1;
                }, 500)
            }, 30)
        }, 1000)
    }, 500)
})
title.addEventListener('mouseout', ()=>{
    clearTimeout(timeout)
})
async function login(){
    let erabiltzailea = document.querySelector('#erabiltzailea').value
    let pasahitza = document.querySelector('#pasahitza').value
    console.log('posting')
    await fetch("http://localhost:3000/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"erabiltzailea": erabiltzailea, "pasahitza": pasahitza}),
    }).then(res=>{
        console.log(res)
        if(res.status == 401){
            message.innerHTML='*Erabiltzaile edo pasahitza okerrak'
        }else if(res.status == 200) {
            window.location.href = res.url
        }
    })
    
}
submit.addEventListener('click', login)