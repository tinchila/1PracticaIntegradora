'use strict'

import express, { json } from 'express'
import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
import cors from 'cors'
import { router } from './routes/index.js'
import exphbs from 'express-handlebars'
import config from './config.js'
import session from 'express-session'
// import MongoStore from 'connect-mongo';
// import mongoose from 'mongoose';
// import handlebars from 'express-handlebars';
import { generateToken } from './utils.js'
// import __dirname from './utils.js';

// import passport from 'passport'
import userModel from './models/Users.model.js'

const server = express()
const swaggerDocument = YAML.load('./openapi.yml')

server.engine('handlebars', exphbs.create(config.handlebars).engine)

server.set('view engine', 'handlebars')
server.set('views', process.cwd() + '/src/views')

server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(
    session({
        secret: 'SecretCoder',
        resave: true,
        saveUninitialized: true,
    })
)

server.use(express.static('./src/public'))

server.use(json())
server.use(cors())

server.use('/api-doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
server.use('/api', router)

// Renderiza la vista chat.handlebars como vista principal
server.get('/', (req, res) => {
    res.render('chat', { title: 'Chat Room', layout: false })
})

server.get('/', (req, res) => [res.render('home')])

const users = [
    {
        email: 'tincho.dotto@gmail.com',
        password: '123456',
    },
]

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

server.post('/api/register', async (req, res) => {
    const { name, email } = req.body
    const exists = users.find(user => user.email === email)
    if (exists) return res.status(400).send({ status: 'error', error: 'User already exists' })
    const user = {
        name,
        email,
    }
    users.push(user)
    const access_token = generateToken(user)
    res.send({ status: 'success', access_token })
})

server.post('/login', async (req, res) => {
    const { email, password } = req.body
    console.log(password)

    const user = await userModel.findOne({ email }) //Ya que el password no está hasheado, podemos buscarlo directamente
    console.log(user + ' Pase por aqui')
    if (!user) return res.status(400).send({ status: 'error', error: 'Incorrect credentials' })

    if (!(user, password)) if (!user) return res.status(403).send({ status: 'error', error: 'Incorrect password' })
    req.session.user = user
    res.send({ status: 'success', payload: req.session.user, message: '¡Primer logueo realizado!' })
})

export default server
