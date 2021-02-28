const bcryptjs = require('bcryptjs')

const Usuario = require('../models/Usuario');

const user = {}

user.usuariosGet = async (req, res) => {
    // Parametos de url despues de ?
    // const params = req.query;
    // console.log(params);
    const {limite = 5, desde = 0} = req.query;

    // const usuarios = await Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite))

    const [data, total] = await Promise.all([
        Usuario.find({estado: true}).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments({estado: true})
    ])

    res.status(200).json({
        ok: true,
        message: 'success',
        total,
        data
    })  
}

user.usuariosPost = async (req, res) => {

    try {
        const {nombre, correo, password, rol} = req.body;
        console.log(req.body);
    
        const usuario = new Usuario({nombre, correo, password, rol});

        // Encriptar password
        const salt = bcryptjs.genSaltSync()
        usuario.password = bcryptjs.hashSync(password, salt)

        console.log(usuario);
    
        // Guardamos en BD
        await usuario.save();
    
        res.status(201).json({
            ok: true,
            message: 'success post',
            data: {usuario}
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })  
    }
}

user.usuariosPut = async (req, res) => {

    try {
        const { id } = req.params
        const { _id, password, google, correo, ...resto } = req.body
    
        if(password) {
            const salt = bcryptjs.genSaltSync()
            resto.password = bcryptjs.hashSync(password, salt)
        }
    
        const usuario = await Usuario.findByIdAndUpdate(id, resto)
    
        res.status(200).json({
            ok: true,
            message: 'success',
            data: {usuario}
        })  
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })  
    }
}

user.usuariosDelete = async (req, res) => {
    const {id} = req.params

    const {usuarioH} = req

    // Borrar fisicamente de la BD
    // const usuario = await Usuario.findByIdAndDelete(id)
    
    // Cambiar el estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false})
    
    const usuarioAutenticado = usuarioH

    res.status(200).json({
        ok: true,
        message: 'success',
        data: usuario,
        usuarioAutenticado
    })  
}

module.exports = user