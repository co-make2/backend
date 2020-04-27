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







module.exports = router;