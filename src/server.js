'use strict'

import express, { json } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'
import { router } from './routes/index.js'
import exphbs from 'express-handlebars'
import config from './config.js'
import session from 'express-session'

const server = express()
const swaggerDocument = YAML.load('./openapi.yml')

server.engine('handlebars', exphbs.create(config.handlebars).engine)
server.set('view engine', process.cwd() + '/src/views')

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(
    session({
        secret: 'SecretCoder',
        resave: true,
        saveUninitialized: true,
    })
)

server.use(json())
server.use(cors())

server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.use('/api', router)

// Renderiza la vista chat.handlebars como vista principal
server.get('/', (req, res) => {
    res.render('chat', { title: 'Chat Room' })
})

let contador = 1
server.get('/', (req, res) => {
    const nombre = req.query.nombre
    if (!req.session.user) {
        req.sesion.user = {
            nombre,
        }
        return res.send(`Bienvenido, ${req.session.user.nombre}`)
    } else {
        return res.send(`Hola, ${req.session.user.nombre}. Has visitado esta ruta ${++contador} veces`)
    }
})

function gracefullShutown(message, code) {
    console.log(`ERROR: ${message}: ${code}`)
}

process.on('exit', code => gracefullShutown('About to exit with: ', code))

export default server
