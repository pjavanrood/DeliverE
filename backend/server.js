// load Enviroment Variables
require('dotenv').config() 

const express = require('express')
const authRoutes = require('./routes/authentication')


// express app
const app = express()

app.use(express.json())

// logging middleware
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/', authRoutes)

app.listen(process.env.PORT, () => {
    console.log('listening on port 4000')
})

