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

module.exports = validateDB