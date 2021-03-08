const categoria = require('../models/categoria');
const producto = require('../models/producto');
const Role = require('../models/role')
const Usuario = require('../models/Usuario');

const validateDB = {}

validateDB.rolValido = async (rol = '') => {
    const existe = await Role.findOne({rol})
    if(!existe) {
        throw new Error(`El rol ${rol} no existe.`)
    }
}

validateDB.emailValido = async (correo = '') => {
    const existe = await Usuario.findOne({correo});

    if(existe) {
        throw new Error('El correo ya esta registrado.')
    }
}

validateDB.idValido = async (id = '') => {
    const existe = await Usuario.findById(id);

    if(!existe) {
        throw new Error('El id no existe.')
    }
}

validateDB.idValidoCat = async (id = '') => {
    const existe = await categoria.findById(id);

    if(!existe) {
        throw new Error('El id no existe.')
    }
}

validateDB.idValidoPro = async (id = '') => {
    const existe = await producto.findById(id);

    if(!existe) {
        throw new Error('El id no existe.')
    }
}

validateDB.coleccionesP = async (coleccion = '', colecciones = []) => {
    const incluida = colecciones.includes(coleccion);

    if(!incluida) {
        throw new Error('la coleccion no es permitida.')
    }

    return true
}

module.exports = validateDB