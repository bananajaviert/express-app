// Imports
import express from 'express'
import url from 'url'
import path from 'path'
import exphbs from 'express-handlebars'
import { router as izonerouter } from './routes/api/members.js'
import { router as itzyrouter } from './routes/api/itzyroute.js'
import { members as itzymembers } from './itzymembers.js'
import { members as izonemembers} from './members.js'
const app = express()

// Accessing directory and files    
const __filename = url.fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PORT = process.env.PORT || 8080

// Body Parser Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Handlebars middleware
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view-engine', 'handlebars')

// Main handlebar route
app.get('/groups/izone', async(req, res) => res.render('izone.handlebars', {
    title: 'IZ*ONE',
    members: izonemembers
}))

app.get('/groups/itzy', async(req, res) => res.render('itzy.handlebars', {
    title: 'ITZY',
    members: itzymembers
}))

// Set static folder
app.use(express.static(path.join(__dirname, '/public')))

// Members API routes
app.use('/groups/izone', izonerouter)


app.use('/groups/itzy', itzyrouter)

const server = app.listen(PORT)

//Middleware

