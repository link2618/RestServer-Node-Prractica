
const adminRole = (req, res, next) => {
    const {usuarioH} = req

    console.log(usuarioH);
    console.log(usuarioH.rol);

    if(!usuarioH){
        return res.status(500).json({
            ok: false,
            message: 'Se quiere validar el role sin validar token'
        }) 
    }

    if (usuarioH.rol != 'ADMIN_ROLE'){
        res.status(401).json({
            message: `${usuarioH.nombre} no es administrador`
        }) 
    }

    next()
}

const tieneRole = (...roles) => {
    return (req, res, next) => {
        const {usuarioH} = req

        if(!usuarioH){
            return res.status(500).json({
                ok: false,
                message: 'Se quiere validar el role sin validar token'
            }) 
        }

        console.log(usuarioH.rol);

        if (!roles.includes(usuarioH.rol)){
            res.status(401).json({
                message: `${usuarioH.nombre} tiene ninguno de estos roles ${roles}`
            }) 
        }
        next()
    }
}

module.exports = {adminRole, tieneRole}