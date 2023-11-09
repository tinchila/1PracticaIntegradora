'use strict'

import express, { json } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'
import { router } from './routes/index.js'
import exphbs from 'express-handlebars'
import config from './config.js'

const server = express()
const swaggerDocument = YAML.load('./openapi.yml')

server.engine('handlebars', exphbs(config.handlebars))
server.set('view engine', 'handlebars')

server.use(json())
server.use(cors())

server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.use('/api', router)

// Renderiza la vista chat.handlebars como vista principal
server.get('/', (req, res) => {
    res.render('chat', { title: 'Chat Room' })
})

function gracefullShutown(message, code) {
    console.log(`ERROR: ${message}: ${code}`)
}

process.on('exit', code => gracefullShutown('About to exit with: ', code))

export default server