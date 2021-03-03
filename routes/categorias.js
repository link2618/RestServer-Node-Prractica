const { Router } = require('express')
const categoria = require('../controllers/categorias')
const { validarJWT, adminRole } = require('../middlewares')
const validarCampos = require('../middlewares/validar-campos')

const router = Router()

router.get('/', categoria.allCategories) // publico
router.get('/:id', validarCampos.validate('categoriesById'), validarCampos.validarCamposObligatorios, categoria.byIdCategories) // publico
router.post('/', validarJWT, validarCampos.validate('createCategories'), validarCampos.validarCamposObligatorios, categoria.createCategories) // Privado - cualquier token
router.put('/:id', validarJWT, validarCampos.validate('updateCategories'), validarCampos.validarCamposObligatorios, categoria.updateCategories) // Privado - cualquier token
router.delete('/:id', validarJWT, adminRole, validarCampos.validate('deleteCategories'), validarCampos.validarCamposObligatorios, categoria.deleteCategories) // Privado - Admin

module.exports = router