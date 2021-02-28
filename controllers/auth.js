
const bcryptjs = require('bcryptjs')
const Usuario = require('../models/Usuario');
const generarJWT = require('../helpers/generar-jwt');
const googleVerify = require('../helpers/google.verify');

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

login.googleSignin = async (req, res) => {
    const {id_token} = req.body

    try {
        const {nombre, img, correo} = await googleVerify (id_token)
        
        let usuario = await Usuario.findOne({correo})

        if(!usuario) {
            const data = {
                nombre,
                correo,
                password: 'cualquier cosa',
                img,
                google: true
            }
            usuario = new Usuario(data)

            await usuario.save()
        }

        if(!usuario.estado) {
            return res.status(401).json({
                message: 'usuario bloqueado'
            })
        }

        // Generar JWT
        const token = await generarJWT(usuario.id)

        res.json({
            message: 'Todo salio bien',
            usuario,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'Token de google no es valido.'
        })
    }
}

module.exports = login