'use strict'

import { Router } from 'express'
import { readdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { removeExtensionFilename } from '../utils/helpers.js'

const router = Router()

const PATH_ROUTES = dirname(`${import.meta.url}`).split('file://')[1]

readdirSync(PATH_ROUTES).filter(filename => {
    let routerFilename = removeExtensionFilename(filename)
    if (routerFilename != 'index') {
        import(`./${routerFilename}.js`).then(routerModule => {
            router.use(`/${routerFilename}`, routerModule.router)
        })
    }
})

export { router }
