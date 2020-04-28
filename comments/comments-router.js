const router = require('express').Router();

const Comments = require('./comments-model.js');

router.get('/', (req,res) => {
    Comments.find()
      .then(comments => {
          res.status(200).json(comments)
      })
      .catch(error => {
        res.status(500).json({ message: "failed to pull comments from server", error: error.message})
      })
})

router.get('/:id', (req,res) => {
  const postId = req.params
  Comments.findAllForPost(postId)
    .then(comments => {
        res.status(200).json(comments)
    })
    .catch(error => {
      res.status(500).json({ message: "failed to pull comments from server", error: error.message})
    })
})

router.post('/', (req,res) => {
    commentData = req.body

    Comments.add(commentData)
      .then(comment => {
          res.status(201).json(comment)
      })
      .catch(error => {
        res.status(500).json({message: "server Failed to create a comment", error: error.message})
    })
})





module.exports = router;