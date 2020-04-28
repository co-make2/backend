const router = require('express').Router();

const Posts = require('./posts-model.js');
const Comments = require('../comments/comments-model.js')

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

    Posts.findById(id)
      .then(user => {
          res.status(200).json(user)
      })
      .catch(error => {
          res.status(500).json({ message: `Failed to pull post with id ${id} from server`, error: error.message})
      })
})

router.delete('/:id', (req, res) => {
    const {id} = req.params

    Posts.remove(id)
      .then(deleted => {
          if(deleted) {
              res.json({removed: deleted})
          } else {
            res.status(404).json({error: `Could not find a project with id ${id}`})
          }
      })
      .catch(error => {
        res.status(500).json({error: `Server unable to delete project with id ${id} Error: ${error}`})
    })
})

router.put('/:id', (req, res) => {
    const {id} = req.params
    const changes = req.body

    Posts.findById(id)
      .then(post => {
          if (post){
              Posts.update(id, changes)
                .then(updatedPost => {
                      res.status(201).json(updatedPost)
                })
          } else {
            res.status(404).json({ message: `Could not find post with id ${id}` })
          }
      })
      .catch(error => {
        res.status(500).json({ error: `Server failed to update post ${error.message}` })
    })
})




module.exports = router;