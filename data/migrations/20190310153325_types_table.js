
exports.up = function(knex, Promise) {
    return knex.schema.createTable('types', tbl => {
        tbl.increments();
        tbl.string('type', 128).unique().notNullable();      
        tbl.timestamp('createdAt').defaultTo(knex.fn.now());
      })
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('types');
};
