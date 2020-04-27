const router = require('express').Router();

const Cats = require('./categories-model.js');

//CRUDs start with /api/categories

router.get('/', (req, res) => {
    Cats.find()
      .then(cats => [
          res.status(200).json(cats)
      ])
      .catch(error => {
          res.status(500).json({ message: "failed to pull categories from server", error: error.message})
      })
})

router.post('/', (req, res) => {
    catName = req.body

    Cats.add(catName)
      .then(cat => {
          res.status(201).json(cat)
    })
      .catch(error => {
          res.status(500).json({message: "server Failed to create a category", error: error.message})
      })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    Cats.remove(id)
      .then(deleted => {
          if(deleted) {
              res.json({ removed: deleted})
          } else{
            res.status(404).json({error: `Could not find a category with id ${id}`})
          }
      })
      .catch(error => {
        res.status(500).json({error: `Server unable to delete project with id ${id} Error: ${error}`})
    })
})

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    Cats.findById(id)
      .then(cat => {
          if(cat){
              Cats.update(id, changes)
                .then(updatedCat => {
                    res.status(201).json(updatedCat)
                })
          } else {
            res.status(404).json({ message: `Could not find category with id ${id}` })
          }
      })
      .catch(error => {
        res.status(500).json({ error: `Server failed to update category ${error.message}` })
    })
})

module.exports = router;