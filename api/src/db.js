const mongoose = require('mongoose')

const DB_URL = process.env.DB_URL
console.log({DB_URL})
mongoose.set('strictQuery', false)
mongoose.connect(DB_URL)
.then(()=>console.log('CONEXION A MONGO EXITOSA'))
.catch((err)=>console.log(`El error de conexion es: ${err}`))