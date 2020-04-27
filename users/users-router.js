const router = require('express').Router();
const bcrypt = require('bcryptjs');
const shortId = require('shortid');

const gt = require('../auth/generateToken.js');
const Users = require('./users-model.js');


//CRUDs Here!!! start with /api/users

router.get('/', (req, res) => {
    Users.find()
      .then(users => {
          res.status(200).json(users)
      })
      .catch(error => {
          res.status(500).json({ message: "failed to pull users from server", error: error.message})
      })
})

router.post("/register", (req, res) => {
    const userData = req.body
    const rounds = process.env.HASH_ROUNDS || 6;
    const hash = bcrypt.hashSync(userData.password, rounds)
    
    userData.password = hash

    if(userData.username && userData.email && userData.password && userData.zip){
        userData.id = shortId.generate();
        Users.add(userData)
          .then(user => {
              const token = gt.generateToken(userData)
              res.status(201).json({userData, token, message: "user Created"})
          })
          .catch(error => {
            res.status(500).json({message: `Server Failed to Create a new User ${error.message}`})
          })
    }else{
        res.status(500).json({errorMessage: "The necessary information to create a user was not provided"})
    }
})

router.post('/login', (req, res) => {
  let { username, password } = req.body;
  console.log(username, password)
  Users.findBy({ username })
    .first()
    .then(user => {
        console.log(user)
        if(user && bcrypt.compareSync(password, user.password)){
            const token = gt.generateToken(user)
            res.status(200).json({
                message: `welcome ${user.username}`, token
            })
        } else {
            res.status(401).json({ message: "Invalid Credentials" })
        }
    })
    .catch(error => {
        console.log(error)
        res.status(500).json({message: 'Server Error for Login', error})
    })
})

router.delete('/:id', (req, res) => {
    const{ id } = req.params;

    Users.remove(id)
      .then(deleted => {
        if (deleted) {
            res.json({removed: deleted})
        } else {
            res.status(404).json({error: `Could not find a project with id ${id}`})
        }
      })
      .catch(error => {
        res.status(500).json({error: `Server unable to delete project with id ${id} Error: ${error}`})
    })
})





module.exports = router;