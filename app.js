import express from 'express'

import url from 'url'

import path from 'path'
import router from './routes/api/members.js'

const app = express()
// Accessing directory and files
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const PORT = process.env.PORT || 8080



// Set static folder
app.use(express.static(path.join(__dirname, '/public')))


app.use('/api/members', router)

const server = app.listen(PORT)

//Middleware
// app.use(logger)
import fs from 'fs'
// File modules
import logger from './middleware/logger.js'

