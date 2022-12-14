const express = require('express')
const Posts  = require('../Models/posts')

const router  = express.Router()





//Save Posts
router.post('/post/save', (req, res) => { 
    let newPost = new Posts(req.body)

    newPost.save((err) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: "Data saved Successfully"
        })
    })
})




// Fetch post from DB
router.get('/posts', (req, res) => {
    Posts.find().exec((err, posts) => {
        if(err){
            return res.status(400).json({
                error: err
            })
        }
        return res.status(200).json({
            success: true,
            existingPosts: posts
        })
    })
})




//update posts
router.put('/post/update/:id', (req, res) => {
    Posts.findByIdAndUpdate(
        req.params.id,{
            $set:req.body
        },
        (err, post) => {
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            return res.status(200).json({
                success: "Update Successfully"
            })
        }
    )
})





//Delete Post
router.delete('/post/delete/:id', (req, res) => {
    Posts.findByIdAndRemove(req.params.id).exec((err, deletedPost) => {
        if(err){
            return res.status(400).json({
                error: "Failed to delete your post", err
            })
        }
        return res.status(200).json({
            success: "Post deleted successfully", deletedPost
        })
    })
})

module.exports = router