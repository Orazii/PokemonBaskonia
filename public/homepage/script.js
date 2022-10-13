const title = document.querySelector('.titleimg')
const back = document.querySelector('.back')
const form = document.querySelector('.formulario')
const signincard = document.querySelector('.formulariobarrua')
const signupcard = document.querySelector('.formulariosignup')
const formcontainer = document.querySelector('.formcontainer')
const submit = document.querySelector('.sartu')
const erregistratu = document.querySelector('.erregistratu')
const saioahasibiratu = document.querySelector('.saioahasibiratu')
const izenaemanbiratu = document.querySelector('.izenaemanbiratu')
const messageFront = document.querySelector('.message-front')
const messageBack = document.querySelector('.message-back')

let timeout; 
let mouseoverevent=()=>{
    timeout = setTimeout(()=>{
        title.style.transitionTimingFunction = 'ease-in'
        title.classList.add('hover')
        setTimeout(()=>{
            back.style.display = 'block';
            formcontainer.style.display = 'grid';
            setTimeout(()=>{
                form.style.height = '300px';
                setTimeout(()=>{
                    signincard.style.opacity = 1;
                }, 500)
            }, 30)
        }, 1000)
    }, 500)
}
title.addEventListener('mouseover', mouseoverevent)
title.addEventListener('mouseout', ()=>{
    clearTimeout(timeout)
})
back.addEventListener('click', ()=>{
    title.removeEventListener('mouseover', mouseoverevent)
    signincard.style.opacity = 0;
    setTimeout(()=>{
        form.style.height = '0px';
        setTimeout(()=>{
            back.style.display = 'none';
            formcontainer.style.display = 'none'
            setTimeout(()=>{
                title.style.transitionTimingFunction = 'ease-out'
                title.classList.remove('hover')
                setTimeout(()=>{
                    title.addEventListener('mouseover', mouseoverevent)
                }, 500)
            }, 500)
        }, 1000)
    }, 200)
})
async function login(){
    let erabiltzailea = document.querySelector('#erabiltzailea').value
    let pasahitza = document.querySelector('#pasahitza').value
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
            messageFront.innerHTML='*Erabiltzaile edo pasahitza okerrak'
            erabiltzailea.value = ''
            pasahitza.value = ''
        }else if(res.status == 200) {
            window.location.href = res.url
        }
    })  
}
async function signup(){
    let erabiltzailea = document.querySelector('#erabiltzaile-berria').value
    let pasahitza = document.querySelector('#pasahitza-berria').value
    await fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({'erabiltzailea': erabiltzailea, 'pasahitza': pasahitza}),
    }).then(res=>{
        console.log(res)
        if (res.status == 401){
            res.text().then(text=>{
                erabiltzailea.value = ''
                pasahitza.value = ''
                messageBack.innerHTML = JSON.parse(text).error
            })
        } else if(res.status == 200) {
            window.location.href = res.url
        }
    }).catch(err=>{
        console.log
    })
}
izenaemanbiratu.addEventListener('click', ()=>{
    signincard.style.zIndex = '10'
    signupcard.style.zIndex = '1'
    form.style.transform= 'rotateY(180deg)';
})
saioahasibiratu.addEventListener('click', ()=>{
    signupcard.style.zIndex = '10'
    signincard.style.zIndex = '1'
    form.style.transform= 'rotateY(0deg)'

})
submit.addEventListener('click', login)
erregistratu.addEventListener('click', signup)
