import express from 'express'
import { getProductsView, getCartView } from '../controllers/ViewsController.js'

const router = express.Router()

router.get('/products', getProductsView)
router.get('/carts/:cid', getCartView)

export default router
