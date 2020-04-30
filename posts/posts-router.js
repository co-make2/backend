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

    if(postData.title && postData.text && postData.zip && postData.user_id){
      Posts.add(postData)
      .then(newPost => {
          res.status(201).json(newPost)
      })
      .catch(error => {
        res.status(500).json({message: "server Failed to create a post", error: error.message})
    })
    } else {
      res.status(404).json({error: 'A Post Request Requires title, text, zip and user_id'})
    }
    
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

router.put('/:id/vote', (req, res) => {
    const {id} = req.params
    const {vote} = req.body
    
    if(vote){
    Posts.findById(id)
      .then(post => {
          if (post){
              Posts.vote(id, vote)
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
    }else{
        res.status(400).json({message: "the put request must contain- vote: value "})
    }
})


module.exports = router;