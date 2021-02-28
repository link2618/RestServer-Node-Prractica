const jwt = require('jsonwebtoken');

const Usuario = require('../models/Usuario')

const validarJWT = async (req, res, next) => {
    const token = req.header('token')

    if(!token) {
        return res.status(401).json({
            message: 'No existe token',
        })
    }

    try {
        // Si el token no es valido dispara el error
        const {uid} = jwt.verify(token, process.env.SECRETPRIVATEKEY)

        const usuario = await Usuario.findById(uid)

        if (!usuario) {
            return res.status(401).json({
                message: 'Token no valido - Usurio no existe'
            })
        }

        // Si el usuario esta inactivo
        if(!usuario.estado) {
            return res.status(401).json({
                message: 'Token no valido - Estado false'
            })
        }
        
        req.usuarioH = usuario;

        next()

    } catch (error) {
        console.log(error);
        res.status(401).json({
            message: 'Token no valido'
        })
    }
}

module.exports = validarJWT