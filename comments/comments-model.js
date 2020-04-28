const dB = require('../data/dbConfig.js')

module.exports = {
    //names of functions
    find,
    findBy,
    findAllForPost,
    findById,
    pullPostandComments,
    add,
    update,
    remove
}

//functions
function find(){
    return dB('comments')
}

function findBy(filter) {
  return dB('comments').where(filter);
}

function findAllForPost({id}) {
  console.log(id)
    return dB('comments').where({post_id: id});
}

function findById(id){
    return dB('comments')
      .where({ id })
      .first()
}



//create after making comments
function pullPostandComments(){

}

function add(comment){
    return dB('comments')
      .insert(comment, 'id')
      .then(([id]) => {
          return findById(id)
      })
      .catch(error => {
          console.log("error on add comment", error)
      })
}

function update(id, changes){
    return dB('comments')
      .where({ id })
      .update(changes)
      .then(() => {
        return findById(id)
      })
      .catch(error => {
        console.log("error on updating comment", error)
      })
}

function remove(id){
    findById(id)
      .then(comment => {
          return (deletedComment = comment)
      })

    return dB('comments')
      .where({ id })
      .del()
      .then(count => {
          return deletedComment
      })
      .catch(error => {
        console.log("error on deleting post", error) 
      })
}


