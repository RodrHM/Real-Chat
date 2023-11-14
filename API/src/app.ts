import express from 'express'
import http from 'http'
import cors from 'cors'
import morgan from 'morgan'
import router from './routers'

const app = express()
const httpServer = http.createServer(app)

app.use(cors({origin:'*'}))
app.use(express.json({limit:'50mb'}))
app.use(morgan('dev'))

app.use('/api', router)

export default httpServer;