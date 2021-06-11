// Imports
import express from 'express'
import fs from 'fs'
import url from 'url'
import path from 'path'

import { router } from './routes/api/members.js'
import logger from './middleware/logger.js'

const app = express()

// Accessing directory and files
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const PORT = process.env.PORT || 8080

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Set static folder
app.use(express.static(path.join(__dirname, '/public')))

// Members API routes
app.use('/api/members', router)

const server = app.listen(PORT)

//Middleware

