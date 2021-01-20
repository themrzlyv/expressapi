import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import cookieParser from 'cookie-parser'

// internal files
import ConnectDb from './helpers/ConnectDb.js'
import routes from './routes/index.js'

// dotenv conf
dotenv.config()


// creating server
const app = express()

const PORT = process.env.PORT || 3050

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileUpload({
    useTempFiles: true
}))

// Database connection

ConnectDb()

app.use("/" , routes)


app.listen(PORT, () => {
    console.log(`Server is running ${PORT}`)
})

