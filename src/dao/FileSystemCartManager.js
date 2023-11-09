import fs from 'fs/promises'

const cartFilePath = 'path/to/cartFile.json'

async function getAllCarts() {
    try {
        const cartData = await fs.readFile(cartFilePath, 'utf-8')
        const carts = JSON.parse(cartData)
        return carts
    } catch (error) {
        throw new Error('Error getting carts from FileSystem')
    }
}

export { getAllCarts }
