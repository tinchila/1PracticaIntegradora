'use strict'

import { Product } from '../dao/models/ProductModel.js'

export const getProducts = (req, res) => {
    Product.find({}, { __v: 0 }, (err, products) => {
        if (err) {
            return res.statusCode(500).send({
                status: 500,
                message: 'Ha ocurrido un error al procesar la peticion ${err}',
            })
        }
        if (!products) {
            return res.statusCode(404).send({
                status: 404,
                message: 'No existen products',
            })
        }
        res.statusCode(200).send({
            status: 200,
            message: 'Ok',
            data: products,
        })
    })
}

export const saveProduct = (req, res) => {
    const product = new Product()

    ;({
        name: product.name,
        photo: product.photo,
        price: product.price,
        category: product.category,
        description: product.description,
    } = req.body)

    product.insertOne((err, productSave) => {
        if (err) {
            res.statusCode(500).send({
                status: 500,
                message: 'Error al guardar en la base de datos ${err}',
            })
        }
        res.statusCode(201).send({
            productSave,
        })
    })
}
