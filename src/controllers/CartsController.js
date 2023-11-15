'use strict'

import { Cart } from '../dao/models/CartModel.js'
import { Product } from '../dao/models/ProductModel.js'

// Obtener un carrito por ID
export const getCartById = async (req, res) => {
    const cartId = req.params.cid

    try {
        const cart = await Cart.findById(cartId).populate('products', '-__v')
        if (!cart) {
            return res.status(404).json({ message: 'El carrito no fue encontrado' })
        }
        res.status(200).json({ cart })
    } catch (error) {
        res.status(500).json({ message: `Error al obtener el carrito: ${error.message}` })
    }
}

// Agregar un producto al carrito por ID de carrito y producto
export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params

    try {
        const cart = await Cart.findById(cid)
        if (!cart) {
            return res.status(404).json({ message: 'El carrito no fue encontrado' })
        }

        const product = await Product.findById(pid)
        if (!product) {
            return res.status(404).json({ message: 'El producto no fue encontrado' })
        }

        cart.products.push(product)
        await cart.save()

        res.status(201).json({ message: `Producto ${pid} agregado al carrito ${cid}` })
    } catch (error) {
        res.status(500).json({ message: `Error al agregar el producto al carrito: ${error.message}` })
    }
}

// Actualizar la cantidad de un producto en el carrito por ID de carrito y producto
export const updateProductQuantity = async (req, res) => {
    const { cid, pid } = req.params
    const { quantity } = req.body

    try {
        const cart = await Cart.findById(cid)
        if (!cart) {
            return res.status(404).json({ message: 'El carrito no fue encontrado' })
        }

        const productIndex = cart.products.findIndex(p => p.equals(pid))
        if (productIndex === -1) {
            return res.status(404).json({ message: 'El producto no fue encontrado en el carrito' })
        }

        cart.products[productIndex].quantity = quantity
        await cart.save()

        res.status(200).json({ message: `Cantidad del producto ${pid} actualizada en el carrito ${cid}` })
    } catch (error) {
        res.status(500).json({
            message: `Error al actualizar la cantidad del producto en el carrito: ${error.message}`,
        })
    }
}

// Eliminar un producto del carrito por ID de carrito y producto
export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params

    try {
        const cart = await Cart.findById(cid)
        if (!cart) {
            return res.status(404).json({ message: 'El carrito no fue encontrado' })
        }

        cart.products = cart.products.filter(p => !p.equals(pid))
        await cart.save()

        res.status(200).json({ message: `Producto ${pid} eliminado del carrito ${cid}` })
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar el producto del carrito: ${error.message}` })
    }
}

// Eliminar todos los productos del carrito por ID de carrito
export const deleteAllProductsFromCart = async (req, res) => {
    const cartId = req.params.cid

    try {
        const cart = await Cart.findById(cartId)
        if (!cart) {
            return res.status(404).json({ message: 'El carrito no fue encontrado' })
        }

        cart.products = []
        await cart.save()

        res.status(200).json({ message: `Se eliminaron todos los productos del carrito ${cartId}` })
    } catch (error) {
        res.status(500).json({ message: `Error al eliminar todos los productos del carrito: ${error.message}` })
    }
}
