'use strict'

import express from 'express'
import { getProducts, saveProduct } from '../controllers/ProductController.js'

const router = express.Router()

// GET
router.get('/', getProducts)

// POST
router.post('/', saveProduct)

export { router }
