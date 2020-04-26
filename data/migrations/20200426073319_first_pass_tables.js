
exports.up = function(knex) {
  return(knex.schema
    .createTable('users', users => {
        users.string('id', 60)
          .primary()
          .unique()
          .notNullable();
        users.string('username', 60)
          .unique()
          .notNullable();
        users.string('email', 60)
          .unique()
          .notNullable();
        users.string('password', 255)
          .notNullable();
        users.string('zip', 5)
          .notNullable();
    })
    
    )
};

exports.down = function(knex) {
  
};
