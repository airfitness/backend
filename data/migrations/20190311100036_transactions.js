
exports.up = function(knex, Promise) {
    return knex.schema.createTable('transactions', tbl => {
        tbl.increments();
        tbl.integer('instructorId').unsigned().references('id').inTable('instructors')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.integer('userId').unsigned().references('id').inTable('users')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.integer('classId').unsigned().references('id').inTable('classes')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.float('price').notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('transactions');
};