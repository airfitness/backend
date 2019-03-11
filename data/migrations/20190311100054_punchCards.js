
exports.up = function(knex, Promise) {
    return knex.schema.createTable('punchCards', tbl => {
        tbl.increments();
        tbl.integer('userId').unsigned().references('id').inTable('users')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.integer('classId').unsigned().references('id').inTable('classes')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.integer('punches_available').notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('punchCards');
};
