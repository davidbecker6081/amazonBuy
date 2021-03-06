exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable("inventory", table => {
      table.increments("id").primary();
      table.string("item");
      table.integer("price");
      table.string("item_description");
      table.string("item_url");

      table.timestamps(true, true);
    }),

    knex.schema.createTable("order_history", table => {
      table.increments("id").primary();
      table.integer("total");

      table.timestamps(true, true);
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable("order_history"),
    knex.schema.dropTable("inventory")
  ]);
};
