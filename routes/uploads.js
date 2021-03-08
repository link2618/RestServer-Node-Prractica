const { Router } = require('express')
const upload = require('../controllers/uploads')
const validarArchivo = require('../middlewares/validar-archivo')
const validarCampos = require('../middlewares/validar-campos')

const router = Router()

router.post('/', validarArchivo.subir, upload.cargarArchivo)
router.put('/:coleccion/:id', validarArchivo.subir, validarCampos.validate('updateImg'), validarCampos.validarCamposObligatorios, upload.actualizarImgCloud)
router.get('/:coleccion/:id', validarCampos.validate('updateImg'), validarCampos.validarCamposObligatorios, upload.mostrarImgCloud)

module.exports = router