
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/generar-jwt');

const login = {}

login.Login = async (req, res) => {
    const {correo, password} = req.body

    try {
        // Verificar ususario
        const usuario = await Usuario.findOne({correo})
        if(!usuario) {
            return res.status(400).json({
                message: 'Alguno de los datos es incorrecto.'
            })
        }

        // Verificar si el usuario esta activo
        if(!usuario.estado) {
            return res.status(400).json({
                message: 'Alguno de los datos es incorrecto - inactivo.'
            })
        }

        // Verificar contraseña
        const validarPass = bcryptjs.compareSync( password, usuario.password )

        if(!validarPass) {
            return res.status(400).json({
                message: 'Alguno de los datos es incorrecto - pass.'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            message: 'Success',
            usuario,
            token
        })        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

module.exports = login