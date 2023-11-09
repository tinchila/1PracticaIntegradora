'use strict'

import { Router } from 'express'
import { getProducts, saveProduct } from '../controllers/ProductController'

const router = Router()

router.get('/', getProducts)

router.post('/', saveProduct)

export { router }
