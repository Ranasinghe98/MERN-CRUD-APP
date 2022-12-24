//Load .ENV variables
if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const connectDb = require('./config/connectDb')
const path = require('path')

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


app.get("https://mern-stack-crud.herokuapp.com//posts", postRoutes.fetchPosts)

app.get("https://mern-stack-crud.herokuapp.com//post/:id", postRoutes.fetchPost)

app.post('https://mern-stack-crud.herokuapp.com//post', postRoutes.createPost)

app.put('https://mern-stack-crud.herokuapp.com//posts/:id', postRoutes.updatePost)

app.delete('https://mern-stack-crud.herokuapp.com//posts/:id', postRoutes.deletePost)


//Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('client/build'))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})