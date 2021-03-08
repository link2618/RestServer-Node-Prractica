const path = require('path');
const fs = require('fs');
const axios = require('axios');

const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)

const subir_archivo = require("../helpers/subir-archivo");

const Producto = require("../models/producto");
const Usuario = require("../models/Usuario");

const upload = {}

upload.cargarArchivo = async (req, res) => {
    try {

        try {
            const nombre = await subir_archivo.upload(req.files, undefined, 'img')

            res.status(200).json({
                nombre
            })
        } catch (error) {
            res.status(400).json({
                message: error
            })
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

upload.actualizarImg = async (req, res) => {
    try {
        const {id, coleccion} = req.params

        let modelo 

        switch (coleccion) {
            case 'users':
                modelo = await Usuario.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    })
                }
            break
            case 'products':
                modelo = await Producto.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el producto'
                    })
                }
            break
            default:
                return res.status(500).json({message: 'No existe esa coleccion'})
        }

        // Limpiar imagenes previas
        if(modelo.img) {
            // Borrar imagen del server
            const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img)
            if (fs.existsSync(pathImg)) {
                fs.unlinkSync(pathImg)
            }
        }

        // Subimos la imagen
        try {
            const nombre = await subir_archivo.upload(req.files, undefined, coleccion)
            modelo.img = nombre
        } catch (error) {
            res.status(400).json({
                message: error
            })
            return
        }

        await modelo.save()
            
        res.status(200).json(modelo)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

upload.actualizarImgCloud = async (req, res) => {
    try {
        const {id, coleccion} = req.params

        let modelo 

        switch (coleccion) {
            case 'users':
                modelo = await Usuario.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    })
                }
            break
            case 'products':
                modelo = await Producto.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el producto'
                    })
                }
            break
            default:
                return res.status(500).json({message: 'No existe esa coleccion'})
        }

        // Limpiar imagenes previas
        if(modelo.img) {
            // Borrar imagen del server
            const nombreArr = modelo.img.split('/')
            const nombre  = nombreArr[nombreArr.length - 1]
            const [public_id] = nombre.split('.')
            cloudinary.uploader.destroy(public_id)
        }

        // Subimos la imagen
        try {
            const {tempFilePath} = req.files.archivo
            const {secure_url} = await cloudinary.uploader.upload(tempFilePath)

            modelo.img = secure_url
        } catch (error) {
            res.status(400).json({
                message: error
            })
            return
        }

        await modelo.save()
            
        res.status(200).json(modelo)
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

upload.mostrarImg = async (req, res) => {
    try {
        const {id, coleccion} = req.params
            
        let modelo 

        switch (coleccion) {
            case 'users':
                modelo = await Usuario.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    })
                }
            break
            case 'products':
                modelo = await Producto.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el producto'
                    })
                }
            break
            default:
                return res.status(500).json({message: 'No existe esa coleccion'})
        }

        // Validar si existe la imagen
        if(modelo.img) {
            const pathImg = path.join(__dirname, '../uploads', coleccion, modelo.img)
            if (fs.existsSync(pathImg)) {
                return res.sendFile(pathImg)
            }
        }

        res.sendFile(path.join(__dirname, '../assets', 'no-image.jpg'))
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

upload.mostrarImgCloud = async (req, res) => {
    try {
        const {id, coleccion} = req.params
            
        let modelo 

        switch (coleccion) {
            case 'users':
                modelo = await Usuario.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el usuario'
                    })
                }
            break
            case 'products':
                modelo = await Producto.findById(id)

                if(!modelo) {
                    return res.status(400).json({
                        message: 'No existe el producto'
                    })
                }
            break
            default:
                return res.status(500).json({message: 'No existe esa coleccion'})
        }

        // Validar si existe la imagen
        if(modelo.img) {
            return res.send(modelo.img)
        }

        res.sendFile(path.join(__dirname, '../assets', 'no-image.jpg'))
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: 'fail'
        })
    }
}

module.exports = upload