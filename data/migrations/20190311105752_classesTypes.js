
exports.up = function(knex, Promise) {
    return knex.schema.createTable('classesTypes', tbl => {
        tbl.increments();
        tbl.integer('classId').unsigned().references('id').inTable('classes')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.integer('typeId').unsigned().references('id').inTable('types')
        .onDelete('CASCADE').onUpdate('CASCADE').notNullable();
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('classesTypes');
};