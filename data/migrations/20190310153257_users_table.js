
exports.up = function(knex, Promise) {
    return knex.schema.createTable('users', tbl => {
        tbl.increments();
        tbl.string('name', 128).notNullable();        
        tbl.string('username', 128).unique().notNullable();    
        tbl.string('email', 128).unique().notNullable();   
        tbl.string('password', 255).notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('users');
};
