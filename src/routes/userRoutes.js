'use strict'

import express from 'express'
import { welcomeMessage } from '../controllers/userController.js'

const router = express.Router()

// Ruta para mostrar el mensaje de bienvenida con los datos del usuario
router.get('/welcome', welcomeMessage)

export { router }
