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
    return dB('posts as p')
      .leftJoin('categories as c', 'p.category_id', 'c.id')
      .join('users as u', 'p.user_id', 'u.id')
      .select('p.id as post_id', 'p.title as post_title', 'p.text as post_text', 'p.zip as post_zip', 'p.created_at as post_created_at','p.upvotes as post_upvotes', 'u.username as posted_by', 'c.category as post_category', 'p.img_url as post_url')
}

function findBy(filter) {
    return dB('posts').where(filter);
}

// function findById(id){
//     return dB('posts as p')
//     .leftJoin('categories as c', 'p.category_id', 'c.id')
//     .join('users as u', 'p.user_id', 'u.id')
//     .select('p.id as post_id', 'p.title as post_title', 'p.text as post_text', 'p.zip as post_zip', 'p.created_at as post_created_at','p.upvotes as post_upvotes', 'u.username as posted_by', 'c.category as post_category', 'p.img_url as post_url')
//     .where({post_id: id})
//     .first()
// }

function findById(id){
  return dB("posts as p")
  .leftJoin("categories as c", "p.category_id", "c.id")
  .join("users as u", "p.user_id", "u.id")
  .select("p.id as post_id", "p.title as post_title", "p.text as post_text", "p.zip as post_zip", "p.created_at as post_created_at","p.upvotes as post_upvotes", "u.username as posted_by", "c.category as post_category", "p.img_url as post_url")
  .where("p.id", id)
  .first()
}



// function pullPostandComments(id){
//   return dB('posts as p')
//     .leftJoin('categories as c', 'p.category_id', 'c.id')
//     .join('users as u', 'p.user_id', 'u.id')
//     .select('p.id as post_id', 'p.title', 'p.text', 'p.zip', 'p.created_at','p.upvotes', 'u.username', 'c.category','c.id as cat_id', 'p.img_url')
//     .where({post_id: id})
// }

// create after making comments
function pullPostandComments(id){
  return dB('posts as p')
  .leftJoin('categories as c', 'p.category_id', 'c.id')
  .join('users as u', 'p.user_id', 'u.id')
  .leftJoin('comments as com', 'p.id', 'com.post_id')
  .select('p.id as post_id', 'p.title as post_title', 'p.text as post_text', 'p.zip as post_zip', 'p.created_at as post_created_at','p.upvotes as post_upvotes', 'u.username as posted_by', 'c.category as post_category', 'p.img_url', 'com.id as comment_id', 'com.text as comment_text', 'com.created_at as comment_created_at')
  .where({post_id: id})
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


