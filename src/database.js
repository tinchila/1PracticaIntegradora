'use strict'

import mongoose from 'mongoose'
import config from './config.js'

mongoose.set('strictQuery', false)

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const connectToDatabase = () => {
    return mongoose.connect(config.MONGODB_URI, mongooseOptions)
}

export default connectToDatabase
