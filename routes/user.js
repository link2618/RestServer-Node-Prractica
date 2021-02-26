const { Router } = require('express')
const { check } = require('express-validator')
const user = require('../controllers/user')
const validarCampos = require('../middlewares/validar-campos')

const router = Router()

router.get('/', user.usuariosGet)

router.put('/:id', validarCampos.validate('updateUser'), validarCampos.validarUsuario, user.usuariosPut)

router.post('/', validarCampos.validate('createUser'), validarCampos.validarUsuario, user.usuariosPost)

router.delete('/:id', validarCampos.validate('deleteUser'), validarCampos.validarUsuario, user.usuariosDelete)

module.exports = router