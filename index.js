const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const fs = require('fs')
const port = 3000;
const sessions = require('express-session')
const cookieParser = require('cookie-parser')
const oneDay = 1000*60*60*24
let erabiltzailea;
let session;

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
    if(session === undefined ){
        res.redirect('/')
    } else {
        res.sendFile(__dirname + '/public/game.html')
    }
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
            console.log(session)
            res.redirect(301, '/game')
        } else {
            res.status(401).send({ error: "Wrong username or password" })
        }
    })
})

app.get('/saved', (req, res)=>{
    if(session){
        res.sendFile(`${__dirname}/erabiltzaileak/${session.userid}/jolasa.json`)
    }
})

app.get('/logout', (req, res)=>{
    req.session.destroy();
    session = undefined;
    res.redirect('/')
})

app.post('/update', (req, res)=>{
    let mapak = JSON.stringify({"mapak":req.body}, null, 2)
    fs.writeFileSync(__dirname+'/public/mapak.json', mapak)
})