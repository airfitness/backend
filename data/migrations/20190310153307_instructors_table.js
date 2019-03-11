
exports.up = function(knex, Promise) {
    return knex.schema.createTable('instructors', tbl => {
        tbl.increments();
        tbl.string('username', 128).unique().notNullable();
        tbl.string('name').notNullable();
        tbl.string('email', 128).unique().notNullable();  
        tbl.string('password', 255).notNullable();
        tbl.string('bio', 255).notNullable();           
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('instructors');
};
