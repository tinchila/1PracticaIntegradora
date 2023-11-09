'use strict'

import mongoose from 'mongoose'

const { Schema, model } = mongoose

const productSchema = Schema({
    name: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        default: 0,
    },
    category: {
        type: String,
        required: true,
        enum: ['Computers', 'Phones', 'Accesories'],
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export const Product = model('Product', productSchema)
