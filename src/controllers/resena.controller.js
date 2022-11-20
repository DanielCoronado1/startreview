const {pool} = require('../db/db.js')
const data = require('../data.js')
const controller = {}

controller.getVideogame = async (req, res) => {
    try {
        const reviewsRows = await pool.query("SELECT * FROM resenas WHERE game_id = ?", req.params.id)
        const reviews = reviews[0]

        const dataGame = {
            id: data[req.params.id-1][0],
            nombre: data[req.params.id-1][1],
            foto: data[req.params.id-1][2],
            video: data[req.params.id-1][3],
            desc: data[req.params.id-1][4]
        }

        res.render('videogame', {reviews, dataGame})
    } catch (error) {
        console.log(error)
    }
}

controller.setReview = async (req, res) => {
    try {
        const {autor, calificacion} = req.body
        const {game_id} = req.params

        await pool.query("INSERT INTO resenas SET ? ", {autor, game_id, calificacion})

        return res.redirect('/videogame/'+game_id)
    } catch (error) {
        console.log(error)
    }
}

module.exports = controller

