const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const cookieParser = require('cookie-parser')


app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views' ))

app.use(express.json)
app.use(express.urlencoded({extended: false}))
app.use(cookieParser())
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

//Routes
const routes = require('./routes/index.routes')
app.use(routes)

//static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res)=>{
    res.sendFile(path.join(__dirname,'public/404.html'))
})

app.listen(3000, () => {
    console.log('iniciado')
    
})
