const { Router } = require('express')
const buscar = require('../controllers/buscar')
const validarCampos = require('../middlewares/validar-campos')

const router = Router()

router.post('/:coleccion/:termino', buscar.general)

module.exports = router