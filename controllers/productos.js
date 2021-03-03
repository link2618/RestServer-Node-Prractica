const Producto = require('../models/producto');
const Categoria = require('../models/categoria');

const producto = {}

producto.allProducts = async (req, res) => {
    try { 
        const {limite = 5, desde = 0} = req.query;

        const [data, total] = await Promise.all([
            Producto.find({estado: true}).populate('categoria', 'nombre').skip(Number(desde)).limit(Number(limite)),
            Producto.countDocuments({estado: true})
        ])

        res.json({
            ok: true,
            message: 'success',
            total,
            data
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

producto.byIdProducts = async (req, res) => {
    try {
        const {id} = req.params
        const producto = await Producto.findById(id)

        if(!producto.estado) {
            return res.status(400).json({
                message: 'Esta producto fue eliminada.'
            })
        }

        const categoria = await Categoria.findById(producto.categoria)
        
        res.json({
            message: 'Success',
            categoriaNom: categoria.nombre,
            producto
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

producto.createProducts = async (req, res) => {
    try {      
        const nombre = req.body.nombre.toUpperCase();
        const {categoria, estado, usuario} = req.body;

        const productoDB = await Producto.findOne({nombre})

        if(productoDB) {
            return res.status(400).json({
                message: 'El producto ya existe.'
            })
        }

        const categoriaDB = await Categoria.findById(categoria)

        if(!categoriaDB) {
            return res.status(400).json({
                message: 'La categoria no existe.'
            })
        }

        if(!categoriaDB.estado) {
            return res.status(400).json({
                message: 'La categoria fue eliminada.'
            })
        }

        const data = {
            nombre,
            usuario: req.usuarioH._id,
            categoria
        }

        const producto = await new Producto(data)

        await producto.save()

        res.status(201).json({
            message: 'Success created',
            data
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

producto.updateProducts = async (req, res) => {
    try {
        const {id} = req.params
        const {usuario, ...data} = req.body

        if(data.nombre){
            data.nombre = data.nombre.toUpperCase()
        }
        data.usuario = req.usuarioH._id

        const producto = await Producto.findByIdAndUpdate(id , data, {new: true})

        res.json({
            message: 'Success update',
            producto
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

producto.deleteProducts = async (req, res) => {
    try {
        const {id} = req.params

        const producto = await Producto.findByIdAndUpdate(id , {estado: false}, {new: true})

        res.json({
            message: 'Success delete',
            producto
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

module.exports = producto