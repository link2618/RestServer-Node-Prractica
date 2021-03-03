const { Router } = require('express')
const validarCampos = require('../middlewares/validar-campos')
const login = require('../controllers/auth')

const router = Router()

router.post('/login', validarCampos.validate('login'), validarCampos.validarCamposObligatorios, login.Login)
router.post('/google', validarCampos.validate('google'), validarCampos.validarCamposObligatorios, login.googleSignin)

module.exports = router