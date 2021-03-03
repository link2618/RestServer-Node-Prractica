const { check, validationResult } = require('express-validator');
const validateDB = require('../helpers/db-validators');

const validarCampos = {} 

validarCampos.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
                check('password', 'El password es obligatorio.').not().isEmpty(),
                check('password', 'El password debe de tener mas de 6 caracteres.').isLength({min: 6 }),
                check('correo', 'El correo no es valido.').isEmail(),
                // check('rol', 'No es un rol valido.').isIn(['ADMIN_ROLE', 'USER_ROLE'])
                check('correo').custom( validateDB.emailValido ),
                check('rol').custom( validateDB.rolValido )
            ]
        }
        case 'updateUser': {
            return [
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValido),
                check('rol').custom(validateDB.rolValido)
            ]
        }
        case 'deleteUser': {
            return [
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValido)
            ]
        }
        case 'login': {
            return [
                check('correo', 'El correo es obligatorio.').isEmail(),
                check('password', 'El password es obligatorio.').not().isEmpty()
            ]
        }
        case 'google': {
            return [
                check('id_token', 'El id_token es obligatorio.').not().isEmpty()
            ]
        }
        case 'createCategories': {
            return [
                check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
            ]
        }
        case 'categoriesById': {
            return [
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValidoCat)
            ]
        }
        case 'updateCategories': {
            return [
                check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValidoCat)
            ]
        }
        case 'deleteCategories': {
            return [
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValidoCat)
            ]
        }
        case 'createProducts': {
            return [
                check('nombre', 'El nombre es obligatorio.').not().isEmpty(),
                check('categoria', 'La categoria es obligatorio.').not().isEmpty(),
                check('categoria', 'El id de categoria no es un id valido.').isMongoId(),
                check('categoria').custom(validateDB.idValidoCat)
            ]
        }
        case 'productsById': {
            return [
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValidoPro)
            ]
        }
        case 'updateProducts': {
            return [
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValidoPro),
                check('categoria', 'La categoria es obligatorio.').not().isEmpty(),
                check('categoria', 'El id de categoria no es un id valido.').isMongoId(),
            ]
        }
        case 'deleteProducts': {
            return [
                check('id', 'No es un id valido.').isMongoId(),
                check('id').custom(validateDB.idValidoPro)
            ]
        }
    }
}

validarCampos.validarCamposObligatorios = ( req, res, next ) => {
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {        
        return res.status(400).json(errors);    
    }

    next()
}

module.exports = validarCampos
