//Load .ENV variables
if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./config/connectDb')

//PORT Config
const PORT = process.env.PORT || 8000

// create express app
const app = express()

//Connect Database
connectDb()

//Import Routes
const postRoutes = require('./Routes/posts')

//App Middleware
app.use(express.json())
app.use(cors())



// Route Middleware
// app.use(postRoutes)


app.get("/posts", postRoutes.fetchPosts)

app.get("/post/:id", postRoutes.fetchPost)

app.post('/post', postRoutes.createPost)

app.put('/posts/:id', postRoutes.updatePost)

app.delete('/posts/:id', postRoutes.deletePost)


app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})