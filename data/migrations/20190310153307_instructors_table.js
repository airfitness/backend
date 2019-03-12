
exports.up = function(knex, Promise) {
    return knex.schema.createTable('instructors', tbl => {
        tbl.increments('id').primary();
        tbl.string('username', 128).unique().notNullable();
        tbl.string('name').notNullable();
        tbl.string('email', 128).unique().notNullable();  
        tbl.string('password', 255).notNullable();
        tbl.string('bio', 255).notNullable();           
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
      .createTable('classes', tbl => {
        tbl.increments();
        tbl.string('class_name', 128).notNullable();
        tbl.integer('instructorId').unsigned().references('id').inTable('instructors').notNullable();
        tbl.string('times').notNullable();
        tbl.float('price').notNullable();
        tbl.string('location').notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('instructors')
    .dropTableIfExists('classes');
};
