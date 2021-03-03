const { Schema, model } = require('mongoose')

const CategoriaShema = Schema({
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
})

// Para quitar datos de forma automatica al momento de enviarlo en la respuesta
CategoriaShema.methods.toJSON = function() {
    const {__v, estado, _id, ...data} = this.toObject()
    data.uid = _id
    return data
}

module.exports = model( 'Categoria', CategoriaShema )