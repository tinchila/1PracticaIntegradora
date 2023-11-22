'use strict'

import server from './server.js'
import config from './config.js'
import connectToDatabase from './database.js'
import { router as productsRouter } from './routes/products.js'
import { router as viewsRouter } from './routes/viewsRoutes.js'
import { router as cartsRouter } from './routes/cart.js'

connectToDatabase()

// RUTAS
server.use('/products', productsRouter)
server.use('/views', viewsRouter)
server.use('/carts', cartsRouter)

// PUERTO
const PORT = config.PORT || 3000
server.listen(PORT, () => console.log(`El servidor está en ejecución en el puerto ${PORT}`))
