exports.up = function (knex) {
  return Promise.all([
    knex.schema.createTable('v_users', (table) => {
      table.increments('id').primary();
      table.string('firstName', 50).notNullable();
      table.string('lastName', 50).notNullable();
      table.string('email').notNullable().unique();
      table.string('username', 50).notNullable().unique();
      table.string('password').notNullable();
    }),
  ]);
};

exports.down = function (knex) {
  return Promise.all([knex.schema.dropTable('v_users')]);
};
