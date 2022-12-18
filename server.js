//Load .ENV variables
if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./config/connectDb')

// create express app
const app = express()

//Connect Database
connectDb()

//Import Routes
const postRoutes = require('./Routes/posts')

//App Middleware
app.use(bodyParser.json())
app.use(cors())



// Route Middleware
app.use(postRoutes)


// mongoose.connect(DB_URL, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })

app.get("/", (req, res) => {
    res.json({hello: "Hima kanawa huththo"})
})

app.post('/post', (req, res) => {
    //Get the data from the request

    //Create a post

    //Respond with the post
})

app.listen(process.env.PORT, () => {
    console.log(`App is running on ${process.env.PORT}`)
})