const { check, validationResult } = require('express-validator');
const validateDB = require('../helpers/db-validators');

const validarCampos = {} 

validarCampos.validate = (method) => {
    switch (method) {
        case 'createUser': {
            return [
                check('nombre', 'El nombre es obligaorio.').not().isEmpty(),
                check('password', 'El password es obligaorio.').not().isEmpty(),
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
    }
}

validarCampos.validarUsuario = ( req, res, next ) => {
    const errors = validationResult(req);    
    if (!errors.isEmpty()) {        
        return res.status(400).json(errors);    
    }

    next()
}

module.exports = validarCampos
