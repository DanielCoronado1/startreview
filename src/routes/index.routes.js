const express = require('express')

const router = express.Router()

const { getVideogame, setReview } = require('../controllers/resena.controller.js')
const { login, logout, addUser } = require('../controllers/auth.controller.js')

//routes
router.get('/',(req, res)=>{
    res.render('index')
})

//Tienda
router.get('/store',(req, res)=>{
    res.render('pages/store')
})

//Subir resena
router.get('/subir',(req, res)=>{
    res.render('resenas/resena')
})

//! Nuevas rutas

//? Pagina de videojuego
router.get('/videogame/:id', getVideogame)

//? set reseña
router.post('/videogame/review/:id', setReview)

//? login
router.get('/login', login)

//? logout
router.get('/logout', logout)

//? Agregar usuario FUNCIONALIDAD
router.post('/addUser', addUser)

//resenas routes
router.get('/zelda',(req, res)=>{
    res.render('resenas/zelda')
})
router.get('/halo_reach',(req, res)=>{
    res.render('resenas/halo_reach')
})
router.get('/mario_kart',(req, res)=>{
    res.render('resenas/mario_kart')
})
router.get('/cold_war',(req, res)=>{
    res.render('resenas/cold_war')
})
router.get('/bioshock',(req, res)=>{
    res.render('resenas/bioshock')
})
router.get('/destiny2',(req, res)=>{
    res.render('resenas/destiny2')
})
router.get('/gears_3',(req, res)=>{
    res.render('resenas/gears_3')
})




module.exports = router