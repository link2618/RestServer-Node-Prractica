const {ObjectId} = require('mongoose').Types
const Usuario = require('../models/Usuario')
const Categoria = require('../models/categoria')
const Producto = require('../models/producto')

const buscar = {}

const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles']

const buscarUsuario = async (termino = '', res) => {
    const mongoId = ObjectId.isValid(termino)

    if(mongoId) {
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario)?[usuario]:[]
        })
    }

    const regex = new RegExp(termino, 'i')
    const usuario = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    return res.json({
        results: [usuario]
    })
}

const buscarCategoria = async (termino = '', res) => {
    const mongoId = ObjectId.isValid(termino)

    if(mongoId) {
        const categoria = await Categoria.findById(termino)
        return res.json({
            results: (categoria)?[categoria]:[]
        })
    }

    const regex = new RegExp(termino, 'i')
    const categoria = await Categoria.find({nombre: regex, estado: true})

    return res.json({
        results: [categoria]
    })
}

const buscarProducto = async (termino = '', res) => {
    const mongoId = ObjectId.isValid(termino)

    if(mongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre')
        return res.json({
            results: (producto)?[producto]:[]
        })
    }

    const regex = new RegExp(termino, 'i')
    const producto = await Producto.find({nombre: regex, estado: true}).populate('categoria', 'nombre')

    return res.json({
        results: [producto]
    })
}

buscar.general = async (req, res) => {
    const {coleccion, termino} = req.params

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            message: `Las colecciones permitidas son ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuario(termino, res)
        break;
        case 'categorias':
            buscarCategoria(termino, res)
        break;
        case 'productos':
            buscarProducto(termino, res)
        break;
        case 'roles':
        break;
        default:
            res.status(500).json({
                message: `Error`
            })
        break;
    }
}

module.exports = buscar