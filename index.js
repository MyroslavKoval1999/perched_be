const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const port = 3001

app.use(bodyParser.json())

// const get = require('./src/routes/get')

// app.use('/post', get)


mongoose.connect(process.env.MONGO_DB_CONNECTION, { useNewUrlParser: true })

const connection = mongoose.connection

connection.once("open", () => {
    console.log('DB is stablished')
})




app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})