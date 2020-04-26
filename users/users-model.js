const dB = require('../data/dbConfig.js')

module.exports = {
    //names of functions
    find,
    findById,
    add,
    update,
    remove
}

//functions
function find(){
    return dB('users')
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

function remove(id){
    findById(id)
      .then(user => {
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


