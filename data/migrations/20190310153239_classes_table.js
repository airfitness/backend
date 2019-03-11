
exports.up = function(knex, Promise) {
    return knex.schema.createTable('classes', tbl => {
        tbl.increments();
        tbl.string('class_name', 128).notNullable();
        tbl.integer('instructorId').unsigned().references('id').inTable('instructors')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.string('times').notNullable();
        tbl.float('price').notNullable();
        tbl.string('location').notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('classes');
};
