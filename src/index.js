'use strict'

import server from './server.js'
import config from './config.js'
import connectToDatabase from './database.js'

connectToDatabase()

server.listen(config.PORT, () => console.log(`Server is running at ${config.PORT}`))
