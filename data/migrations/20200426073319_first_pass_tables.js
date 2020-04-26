
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
        users.boolean('verified')
          .defaultTo(false)
    })
    .createTable('categories', categories => {
        categories.increments('id');
        categories.string('category', 30)
          .unique()
          .notNullable();
    })
    .createTable('posts', posts => {
        posts.increments('id');
        posts.string('title', 150)
          .notNullable();
        posts.text('text')
          .notNullable();
        posts.string('zip', 5)
          .notNullable();
        posts.timestamp('created_at')
          .defaultTo(knex.fn.now());
        posts.integer('upvotes')
          .defaultTo(0);
        posts.string('user_id', 60)
          .notNullable()
          .references('id')
          .inTable('users')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
        posts.integer('category_id')
          .references('id')
          .inTable('categories')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
        posts.string('img_url', 150);
    })
    .createTable('comments', comments => {
        comments.increments('id');
        comments.string('user_id', 60)
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('RESTRICT')
        .onUpdate('CASCADE');
        comments.integer('post_id')
          .notNullable()
          .references('id')
          .inTable('posts')
          .onDelete('RESTRICT')
          .onUpdate('CASCADE');
        comments.text('text')
          .notNullable();
        comments.timestamp('created_at')
          .defaultTo(knex.fn.now());
    })
    )
};

exports.down = function(knex) {
  return knex.schema
  .dropTableIfExists('comments')
  .dropTableIfExists('posts')
  .dropTableIfExists('categories')
  .dropTableIfExists('users')
};
