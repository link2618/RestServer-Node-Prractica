
const validarArchivo = {}

validarArchivo.subir = (req, res, next) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({message:'No tiene archivos para subir.'});
    }
    next()
}

module.exports = validarArchivo