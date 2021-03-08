const path = require('path');
const {v4: uuidv4} = require('uuid')

const subir_archivo = {}

subir_archivo.upload = async (files, extencionesValidas = ['png', 'jpg', 'jpeg'], carpeta = '') => {
    return new Promise((resolve, reject) => {
        const {archivo} = files;
        const nombreCortado = archivo.name.split('.')
        const extencion = nombreCortado[nombreCortado.length - 1];
    
        if (!extencionesValidas.includes(extencion)) {
            reject('La extencion no es permitida.')
            return
        }
    
        const nombreTemp = uuidv4() + '.' + extencion;
        const uploadPath = path.join(__dirname, '../uploads/', carpeta, nombreTemp);
    
        archivo.mv(uploadPath, (err) => {
            if (err) {
                reject(err)
            }
    
            resolve(nombreTemp)
        });
    })
}

module.exports = subir_archivo