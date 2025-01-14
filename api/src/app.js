const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const pkg = require('../package.json')
const routes = require('./routes/index')

const app = express()

app.set('apk', pkg)
app.use(cors({origin:'*'}))
app.use(express.json({ limit:'50mb' }))
app.use(morgan('dev'))

app.use('/api', routes)
app.get('/', (req, res)=>{
    return res.status(200).json({
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})

module.exports = app