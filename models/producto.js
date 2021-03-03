const { Schema, model } = require('mongoose')

const ProductoShema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuaio',
        required: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true,
    }
})

// Para quitar datos de forma automatica al momento de enviarlo en la respuesta
ProductoShema.methods.toJSON = function() {
    const {__v, estado, _id, ...data} = this.toObject()
    data.uid = _id
    return data
}

module.exports = model( 'Producto', ProductoShema )