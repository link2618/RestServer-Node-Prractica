
const validarCampos = require('../middlewares/validar-campos')
const validarJWT = require('../middlewares/validar-jwt')
const validarRoles = require('../middlewares/validar-roles')

const mid = {
    validarCampos,
    validarJWT,
    ...validarRoles,
}

module.exports = mid