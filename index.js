const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const port = 3000;
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const oneDay = 1000*60*60*24
let erabiltzailea;
let session = {};

app.use(sessions({
    secret: 'n3iu4th398hfdksjh84',
    resave: false,
    cookie: {maxAge: oneDay},
    saveUninitialized: true,
}))

app.use(cookieParser())

app.use(express.static('public'));
// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use((req, res, next)=>{
    console.log(`${req.method} ${req.path} received at ${new Date()}`)
    next()
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname +'/public/homepage/homepage.html')
})

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})
app.get('/game', (req, res)=>{
    console.log(session.userid)
    // if(session.userid === undefined ){
    //     console.log('redirecting')
    //     res.redirect('/')
    // } else {
    //     res.sendFile(__dirname + '/public/Game/game.html')
    // }
    session.userid = 'admin';
    res.sendFile(__dirname + '/public/Game/game.html')
})

app.post('/login', (req, res)=>{
    fs.readFile(`${__dirname}/erabiltzaileak/${req.body.erabiltzailea}/pasahitza.txt`, 'utf8', (err, data)=>{
        if (err) {
            res.status(401).send({ error: "Wrong username or password" })
            return;
        }
        if (data == req.body.pasahitza){
            session = req.session;
            session.userid = req.body.erabiltzailea
            res.redirect(301, '/game')
        } else {
            res.status(401).send({ error: "Wrong username or password" })
        }
    })
})

app.post('/signup', (req, res)=>{
    if (req.body.pasahitza == ''){
        res.status(401).send({error: '*Pasahitza jarri'})
        return
    }else if (req.body.erabiltzailea == ''){
        res.status(401).send({error: '*Erabiltzaile izena jarri'})
        return
    }else if (fs.existsSync(`${__dirname}/erabiltzaileak/${req.body.erabiltzailea}`)){
        res.status(401).send({ error: '*Erabiltzailea ez dago erabilgarri'})
        return
    }
    fs.mkdirSync(`${__dirname}/erabiltzaileak/${req.body.erabiltzailea}`)
    fs.writeFile(`${__dirname}/erabiltzaileak/${req.body.erabiltzailea}/pasahitza.txt`, req.body.pasahitza,(err)=>{
        if(err){console.log(err)}
    })
    fs.writeFile(`${__dirname}/erabiltzaileak/${req.body.erabiltzailea}/jolasa.json`, `
    {
        "mapa": "Etxea",
        "protagonista": {
            "izena": "izaro",
            "skin": "protagonista-mutila",
            "dir": "gora",
            "x": 4, 
            "y": 5
        },
        "dominak": [],
        "denbora": 0
    }
    `, (err)=>{if(err){console.log(err)}})
    session = req.session;
    session.userid = req.body.erabiltzailea
    res.redirect(301, '/game')

})

app.get('/saved', (req, res)=>{
    if(session){
        res.sendFile(`${__dirname}/erabiltzaileak/${session.userid}/jolasa.json`)
    }
})
app.post('/saved', (req,res)=>{
    if(session){
        let saved = JSON.stringify(req.body, null, 2)
        fs.writeFile(`${__dirname}/erabiltzaileak/${session.userid}/jolasa.json`, saved, (err)=>{
            console.log(err)
            res.send('saved')
        })
    }
})

app.get('/logout', (req, res)=>{
    req.session.destroy();
    session = undefined;
    res.redirect('/')
})

app.post('/update', (req, res)=>{
    let mapak = JSON.stringify({"mapak":req.body}, null, 2)
    fs.writeFileSync(__dirname+'/public/Game/mapak.json', mapak)
})

app.get('/images/people', (req, res)=>{
    fs.readdir(__dirname+'/public/images/people', (err, files)=>{
        if(err){
            console.log(err)
        }
        res.send({files})
    })
})
app.get('/images/maps', (req, res)=>{
    fs.readdir(__dirname+'/public/images/maps', (err, files)=>{
        if(err){
            console.log(err)
        }
        res.send({files})
    })
})