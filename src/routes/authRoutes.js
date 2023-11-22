'use strict'

import express from 'express'
import { login, logout } from '../controllers/authController.js'

const router = express.Router()

// Inicio de sesión
router.post('/login', login)

// Cerrar sesión
router.get('/logout', logout)

export { router }
