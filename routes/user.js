const { Router } = require('express')
const user = require('../controllers/user')

// const validarCampos = require('../middlewares/validar-campos')
// const validarJWT = require('../middlewares/validar-jwt')
// const {adminRole, tieneRole} = require('../middlewares/validar-roles')

const {validarCampos, validarJWT, adminRole, tieneRole} = require('../middlewares')

const router = Router()

router.get('/', validarJWT, tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'), user.usuariosGet)

router.put('/:id', validarJWT, tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'), validarCampos.validate('updateUser'), validarCampos.validarUsuario, user.usuariosPut)

router.post('/', validarCampos.validate('createUser'), validarCampos.validarUsuario, user.usuariosPost)

router.delete('/:id', validarJWT, adminRole, validarCampos.validate('deleteUser'), validarCampos.validarUsuario, user.usuariosDelete)

module.exports = router