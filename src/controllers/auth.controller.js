const {pool} = require('../db/db.js')
const jwt = require('jsonwebtoken')
const cookie = require('cookie')

const controller = {}

controller.addUser = async(req, res) => {
    const {correo, contrasena, tipo_usuario} = req.body
    await pool.query("INSERT INTO usuarios SET ?", {correo, contrasena, tipo_usuario})
    res.json('usuario creado')
    
}

controller.login = async(req, res) => {
    const user = await pool.query("SELECT * FROM usuarios WHERE correo = ? AND contrsena = ?", [req.body.correo, req.body.contrasena])

    if(!user[0].length > 0) return res.status(500).json('Ocurrio un error')

    const token = jwt.sign(
        {
            exp: Math.floor(Date.now()/ 100) + 60 * 60 * 24 * 30,
        },
        'secret'
    )

    const serialized = cookie.serialize('loginToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 *24 * 30,
        path: '/'
    })

    res.setHeader("Set-Cookie", serialized)
    return res.redirect('/')
}

controller.logout = async (req, res) => {
    const {loginToken} = req.cookies

    if(!loginToken) return res.status(500).json('sin token')

    const serialized = cookie.serialize('loginToken', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 0,
        path: '/'
    })

    res.setHeader('Set-Cookie', serialized)
    res.redirect('/')
}

module.export = controller