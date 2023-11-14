import 'dotenv/config'
import {load} from 'ts-dotenv'

const env = load({
    PORT:Number,
    DB_URL:String
})

export default env;