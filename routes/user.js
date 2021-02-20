const { Router } = require('express')
const user = require('../controllers/user')

const router = Router()

router.get('/', user.usuariosGet)

router.put('/:id', user.usuariosPut)

router.post('/', user.usuariosPost)

router.delete('/', user.usuariosDelete)

module.exports = router