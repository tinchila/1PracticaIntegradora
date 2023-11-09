import Cart from '../models/CartModel'

async function getAllCarts() {
    try {
        const carts = await Cart.find()
        return carts
    } catch (error) {
        throw new Error('Error getting carts from MongoDB')
    }
}

export { getAllCarts }
