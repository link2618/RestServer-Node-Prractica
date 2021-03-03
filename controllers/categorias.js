const Categoria = require('../models/categoria');

const categoria = {}

categoria.allCategories = async (req, res) => {
    try { 
        const {limite = 5, desde = 0} = req.query;

        const [data, total] = await Promise.all([
            Categoria.find({estado: true}).populate('usuario', 'nombre').skip(Number(desde)).limit(Number(limite)),
            Categoria.countDocuments({estado: true})
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

categoria.byIdCategories = async (req, res) => {
    try {
        const {id} = req.params
        const categoria = await Categoria.findById(id)

        if(!categoria.estado) {
            return res.status(400).json({
                message: 'Esta categoria fue eliminada.'
            })
        }

        res.json({
            message: 'Success',
            categoria
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

categoria.createCategories = async (req, res) => {
    try {      
        const nombre = req.body.nombre.toUpperCase();

        const categoriaDB = await Categoria.findOne({nombre})

        if(categoriaDB) {
            return res.status(400).json({
                message: 'La categoria ya existe.'
            })
        }

        const data = {
            nombre,
            usuario: req.usuarioH._id
        }

        console.log(data);

        const categoria = await new Categoria(data)

        await categoria.save()

        res.status(201).json({
            message: 'Success created'
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

categoria.updateCategories = async (req, res) => {
    try {
        const {id} = req.params
        const {estado, usuario, ...data} = req.body

        data.nombre = data.nombre.toUpperCase()
        data.usuario = req.usuarioH._id

        const categoria = await Categoria.findByIdAndUpdate(id , data, {new: true})

        res.json({
            message: 'Success update',
            categoria
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

categoria.deleteCategories = async (req, res) => {
    try {
        const {id} = req.params

        const categoria = await Categoria.findByIdAndUpdate(id , {estado: false}, {new: true})

        res.json({
            message: 'Success delete',
            categoria
        })  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

module.exports = categoria