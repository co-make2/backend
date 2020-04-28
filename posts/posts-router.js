const router = require('express').Router();

const Posts = require('./posts-model.js');

router.get('/', (req, res) => {
    Posts.find()
      .then(posts => {
          res.status(200).json(posts)
      })
      .catch(error => {
          res.status(500).json({ message: "failed to pull posts from server", error: error.message})
      })
})


router.post('/', (req, res) => {
    postData = req.body

    Posts.add(postData)
      .then(newPost => {
          res.status(201).json(newPost)
      })
      .catch(error => {
        res.status(500).json({message: "server Failed to create a post", error: error.message})
    })
})

router.get('/:id', (req, res) => {
    const { id } = req.params

    Posts.pullPostandComments(id)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(error => {
          res.status(500).json({ message: `Failed to pull post with id ${id} from server`, error: error.message})
      })
})







module.exports = router;