'use strict'

import express from 'express'
const router = express.Router()

// Endpoint
router.get('/:cid', (req, res) => {
    const cartId = req.params.cid
    res.status(200).json({ message: `Obteniendo el carrito con ID ${cartId}` })
})

router.post('/:cid/products', (req, res) => {
    const cartId = req.params.cid
    const productId = req.body.productId
    res.status(201).json({ message: `Producto ${productId} agregado al carrito ${cartId}` })
})

export { router }
