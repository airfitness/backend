exports.up = function(knex, Promise) {
    return knex.schema.createTable('classesTypes', tbl => {
        tbl.increments();
        tbl.string('type', 128).notNullable();        
        tbl.integer('classId').unsigned().references('id').inTable('classes').notNullable();
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('classesTypes');
};