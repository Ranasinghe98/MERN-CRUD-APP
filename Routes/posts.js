const express = require('express')
const Post  = require('../Models/posts')

//const router  = express.Router()

// Fetch all posts
const fetchPosts = async (req, res) => {
    //find the notes
    const posts = await Post.find()

    //respond with them
    res.json({ posts })
}


//fetch single post
const fetchPost = async (req, res) => {
    //Get if off the url
    const postId = req.params.id

    //Find the post using that id
    const post = await Post.findById(postId)

    //Respond with the post
    res.json({ post })
}


//save new post to database
const createPost = async (req, res) => {
    //Get the data from the request
    const { topic, description, postCategory } = req.body

    //Create a post
    const post = await Post.create({
        topic,
        description,
        postCategory
        })

    //Respond with the post
    res.json({ post })
}


//update post
const updatePost = async (req, res) => {
    //Get the id off the url
    const postId = req.params.id

    //Get the data off the request body
    const { topic, description, postCategory } = req.body

    //Find and update the record
    await Post.findByIdAndUpdate(postId, {
        topic,
        description,
        postCategory
    })

    //Find Updated post
    const post = await Post.findById(postId)

    //Respond with it
    res.json({ post })
}


//delete post
const deletePost = async (req, res) => {
    //Get the id off the url
    const postId = req.params.id

    //Delete the record
    await Post.deleteOne({_id: postId})

    //Respond with it
    res.json({success: "Record Deleted"})
}


module.exports = {
    fetchPosts,
    fetchPost,
    createPost,
    updatePost,
    deletePost
}