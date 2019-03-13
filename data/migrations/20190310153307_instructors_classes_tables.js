
exports.up = function(knex, Promise) {
    return knex.schema.createTable('instructors', tbl => {
        tbl.increments('id').primary();
        tbl.string('username', 128).unique().notNullable();
        tbl.string('name');
        tbl.string('email', 128).unique();  
        tbl.string('password', 255).notNullable();
        tbl.string('bio', 510);  
        tbl.string('priv', 128).notNullable().defaultTo('instructor');         
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
      .createTable('classes', tbl => {
        tbl.increments();
        tbl.string('class_name', 128).notNullable();
        tbl.integer('instructorId').unsigned().references('id').inTable('instructors').notNullable();
        tbl.string('times', 255).notNullable();
        tbl.float('price').notNullable();
        tbl.string('location', 255).notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('instructors')
    .dropTableIfExists('classes');
};
