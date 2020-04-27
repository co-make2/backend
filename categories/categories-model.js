const dB = require('../data/dbConfig.js')

module.exports = {
    find,
    findBy,
    findById,
    add,
    update,
    remove
}

function find(){
    return dB('categories')
}

function findBy(filter) {
    return dB('categories').where(filter);
  }

function findById(id){
    return dB('categories')
      .where({ id })
      .first()
}

function add(user){
    return dB('categories')
      .insert(user, 'id')
      .then(([id]) => {
          return findById(id)
      })
      .catch(error => {
          console.log("error on add category", error)
      })
}

function update(id, changes){
    return dB('categories')
      .where({ id })
      .update(changes)
      .then(() => {
        return findById(id)
      })
      .catch(error => {
        console.log("error on updating category", error)
      })
}

function remove(id){
    findById(id)
      .then(cat => {
          return (deletedcat = cat)
      })

    return dB('categories')
      .where({ id })
      .del()
      .then(count => {
          return deletedcat
      })
      .catch(error => {
        console.log("error on deleting category", error) 
      })
}
