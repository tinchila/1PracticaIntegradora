'use strict'

import { Product } from '../dao/models/ProductModel.js'
import { Cart } from '../dao/models/CartModel.js'

export const getProductsView = async (req, res) => {
    try {
        const products = await Product.find({}).lean()

        res.render('products', { products })
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener los productos' })
    }
}

export const getCartView = async (req, res) => {
    const cartId = req.params.cid

    try {
        const cart = await Cart.findById(cartId).populate('products.product').lean()

        if (!cart) {
            return res.status(404).send({ message: 'Carrito no encontrado' })
        }

        res.render('cart', { cart })
    } catch (error) {
        res.status(500).send({ message: 'Error al obtener el carrito' })
    }
}
