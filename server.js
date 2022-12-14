const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()

//Import Routes
const postRoutes = require('./Routes/posts')

//App Middleware
app.use(bodyParser.json())



// Route Middleware
app.use(postRoutes);



const PORT = 8000
const DB_URL = "mongodb+srv://rosh:rosh123@simplemern.p6hq46y.mongodb.net/mernCURD?retryWrites=true&w=majority"

mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.info("Mongoose Connected Successfully")
    // console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
})
.catch((err) => console.log("Mongoose Connection Failed", err))

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})