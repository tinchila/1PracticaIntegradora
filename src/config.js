'use strict'

import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

const config = {
    PORT: process.env.PORT ?? 3000,
    MONGODB_URI: process.env.MONGODB_URI,
}

config.handlebars = {
    extname: '.handlebars',
    defaultLayout: 'main',
}

export default config
