const express = require('express')
const cors = require('cors')
const fileupload = require('express-fileupload')
const dbConnection = require('../database/config')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT

        this.paths = {
            auth: '/api/auth',
            usuarios: '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos',
            buscar: '/api/buscar',
            uploads: '/api/uploads',
        }

        // conectar a bd
        this.cocectarBD()

        // Middleware
        this.middelware()

        // Rutas de la app
        this.routes()
    }

    async cocectarBD() {
        await dbConnection()
    }

    middelware() {
        this.app.use(cors())

        // Lectura y parseo del body
        this.app.use( express.json() )

        // Directorio publico
        this.app.use( express.static('public'))

        // Carga de archivos
        this.app.use(fileupload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'))
        this.app.use(this.paths.usuarios, require('../routes/user'))
        this.app.use(this.paths.categorias, require('../routes/categorias'))
        this.app.use(this.paths.productos, require('../routes/productos'))
        this.app.use(this.paths.buscar, require('../routes/buscar'))
        this.app.use(this.paths.uploads, require('../routes/uploads'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server corriendo en el puerto ${this.port}`);
        })
    }
}

module.exports = Server;