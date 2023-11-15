import { Product } from '../dao/models/ProductModel.js'

export const getProducts = async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query
    let filter = {}
    let sortOptions = {}

    // Filter
    if (query) {
        filter = { category: query }
    }

    // Sort
    if (sort === 'asc') {
        sortOptions = { price: 1 }
    } else if (sort === 'desc') {
        sortOptions = { price: -1 }
    }

    try {
        const totalProducts = await Product.countDocuments(filter)
        const totalPages = Math.ceil(totalProducts / limit)
        const skip = (page - 1) * limit

        const products = await Product.find(filter)
            .sort(sortOptions)
            .limit(parseInt(limit))
            .skip(skip)
            .select('-__v')
            .exec()

        const prevPage = page > 1 ? page - 1 : null
        const nextPage = page < totalPages ? page + 1 : null

        const response = {
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page,
            hasPrevPage: prevPage !== null,
            hasNextPage: nextPage !== null,
            prevLink: prevPage !== null ? `/products?page=${prevPage}&limit=${limit}` : null,
            nextLink: nextPage !== null ? `/products?page=${nextPage}&limit=${limit}` : null,
        }

        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ status: 'error', message: `Error: ${error.message}` })
    }
}
