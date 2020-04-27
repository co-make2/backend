const dB = require('../data/dbConfig.js')

module.exports = {
    //names of functions
    find,
    findBy,
    findById,
    pullPostandComments,
    add,
    update,
    remove
}

//functions
function find(){
    return dB('posts')
}

function findBy(filter) {
    return dB('posts').where(filter);
}

function findById(id){
    return dB('posts')
      .where({ id })
      .first()
}



//create after making comments
function pullPostandComments(){

}

function add(post){
    return dB('posts')
      .insert(post, 'id')
      .then(([id]) => {
          return findById(id)
      })
      .catch(error => {
          console.log("error on add user", error)
      })
}

function update(id, changes){
    return dB('posts')
      .where({ id })
      .update(changes)
      .then(() => {
        return findById(id)
      })
      .catch(error => {
        console.log("error on updating post", error)
      })
}

function remove(id){
    findById(id)
      .then(post => {
          return (deletedPost = post)
      })

    return dB('posts')
      .where({ id })
      .del()
      .then(count => {
          return deletedPost
      })
      .catch(error => {
        console.log("error on deleting post", error) 
      })
}


