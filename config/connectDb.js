if (process.env.NODE_ENV != 'production'){
    require('dotenv').config()
}

const mongoose = require('mongoose')

async function connectDb(){
    try{
        await mongoose.connect(process.env.DB_URL)
        console.log('Connected to database')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDb