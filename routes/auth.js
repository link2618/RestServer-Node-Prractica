const { Router } = require('express')
const validarCampos = require('../middlewares/validar-campos')
const login = require('../controllers/auth')

const router = Router()

router.post('/login', validarCampos.validate('login'), validarCampos.validarUsuario, login.Login)
router.post('/google', validarCampos.validate('google'), validarCampos.validarUsuario, login.googleSignin)

module.exports = router