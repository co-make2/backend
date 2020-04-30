const bcrypt = require('bcryptjs');
const dB = require('../data/dbConfig.js')

module.exports = {
    //names of functions
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

//functions
function find(){
    return dB('users')
}

function findBy(filter) {
    return dB('users').where(filter);
  }

function findById(id){
    return dB('users')
      .where({ id })
      .first()
}

function add(user){
    return dB('users')
      .insert(user, 'id')
      .then(([id]) => {
          return findById(id)
      })
      .catch(error => {
          console.log("error on add user", error)
      })
}

function update(id, changes){

  if(changes.password){
    const password = changes.password
    const rounds = process.env.HASH_ROUNDS || 6;
    const hash = bcrypt.hashSync(password, rounds)
    changes.password = hash

      return dB('users')
      .where({ id })
      .update(changes)
      .then(() => {
        return findById(id)
      })
      .catch(error => {
        console.log("error on updating user", error)
      })
    
  } else {
    return dB('users')
    .where({ id })
    .update(changes)
    .then(() => {
      return findById(id)
    })
    .catch(error => {
      console.log("error on updating user", error)
    })
  }
}

function remove(id){
    findById(id)
      .then(user => {
        // console.log("USER",user)
          return (deletedUser = user)
      })

    return dB('users')
      .where({ id })
      .del()
      .then(count => {
          return deletedUser
      })
      .catch(error => {
        console.log("error on deleting user", error) 
      })
}


