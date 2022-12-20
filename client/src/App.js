import React, { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const [posts, setPosts] = useState(null)
  const [createForm, setCreateForm] = useState({
    topic: '',
    description: '',
    postCategory: ''
  })
  const [updateForm, setUpdateForm] = useState({
    _id: null,
    topic: '',
    description: '',
    postCategory: ''
  })

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try{
      //fetch the posts
      const res = await axios.get('http://localhost:8000/posts')

      //set to state
      setPosts(res.data.posts)
    } catch (err) {
      console.log(err)
    }
  }

  const updateCreateFormField = (event) => {
    const {name, value} = event.target

    setCreateForm({
      ...createForm,
      [name]: value
    })
  }



//Create Post
  const createPost = async (event) => {
    event.preventDefault()

    const res = await axios.post('http://localhost:8000/post', createForm)

    setPosts([...posts, res.data.post])

    //clear form fields
    setCreateForm({ topic: "", description: "", postCategory:"" })
  }



//Delete Post
const deletePost = async (_id) => {
  //Delete the post
  await axios.delete(`http://localhost:8000/posts/${_id}`)

  //update State
  const newPosts = [...posts].filter( post => {
    return post._id !== _id
  })

  setPosts(newPosts)
}


const updateFieldChange = (event) => {
  const {value, name} = event.target

  setUpdateForm({
    ...updateForm,
    [name]: value
  })
}

const toggleUpdate = (post) => {
  //Set state on update form
  setUpdateForm({
    _id: post._id,
    topic: post.topic,
    description: post.description,
    postCategory: post.postCategory
  })
}


const updatePost = async (event) => {
  event.preventDefault()
  //send the update request
  const {topic, description, postCategory} = updateForm
  const res = await axios.put(`http://localhost:8000/posts/${updateForm._id}`, {
    topic,
    description,
    postCategory
  })

  //update state
  const newUpdatedPost = [...posts]
  const postIndex = posts.findIndex(post => {
    return post._id === updateForm._id
  })
  newUpdatedPost[postIndex] = res.data.post
  
  setPosts(newUpdatedPost)

  //clear update form fields
  setUpdateForm({
    _id: null,
    topic: "",
    description: "",
  })
}

  return(<>
      <div>
        <h2>Posts:</h2>
        {posts && posts.map((post) => {
          return(
            <div key={post._id}>
              <h3>{post.topic}</h3>
              <h4>{post.description}</h4>
              <p>{post.postCategory}</p>
              <button onClick={() => deletePost(post._id)}>Delete Post</button>
              <button onClick={() => toggleUpdate(post)}>Update Post</button>
            </div>
          )
        })}

        {updateForm._id && (
        <div className="update">
          <h2>Update Post</h2>
        <form onSubmit={updatePost}>
          <input onChange={updateFieldChange} value={updateForm.topic} name='topic' />
          <textarea onChange={updateFieldChange} value={updateForm.description} name='description' />
          <input onChange={updateFieldChange} value={updateForm.postCategory} name='postCategory' />
          <button type='submit'>Update Post</button>
        </form>
        </div>
        )}

        {!updateForm._id && (
        <div className="insert">
          <h2>Create Post</h2>
          <form onSubmit={createPost}>
            <input onChange={updateCreateFormField} value={createForm.topic} name='topic' />
            <textarea onChange={updateCreateFormField} value={createForm.description} name='description' />
            <input onChange={updateCreateFormField} value={createForm.postCategory} name='postCategory' />
            <button type='submit'>Create Post</button>
          </form>
        </div>
        )}
      </div>
    </>)
}

export default App
