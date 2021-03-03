const { Router } = require('express')
const producto = require('../controllers/productos')
const { validarJWT, adminRole } = require('../middlewares')
const validarCampos = require('../middlewares/validar-campos')

const router = Router()

router.get('/', producto.allProducts) // publico
router.get('/:id', validarCampos.validate('productsById'), validarCampos.validarCamposObligatorios, producto.byIdProducts) // publico
router.post('/', validarJWT, validarCampos.validate('createProducts'), validarCampos.validarCamposObligatorios, producto.createProducts) // Privado - cualquier token
router.put('/:id', validarJWT, validarCampos.validate('updateProducts'), validarCampos.validarCamposObligatorios, producto.updateProducts) // Privado - cualquier token
router.delete('/:id', validarJWT, adminRole, validarCampos.validate('deleteProducts'), validarCampos.validarCamposObligatorios, producto.deleteProducts) // Privado - Admin

module.exports = router