exports.seed = function(knex, Promise) {
  return knex('order_history')
    .del()
    .then(() => {
      return knex('order_history').insert([
        { id: 1, total: 1000 },
        { id: 2, total: 2000 },
        { id: 3, total: 3000 },
      ]);
    })
    .then(() => {
			console.log('Seeding is complete.');
		})
		.catch(error => console.log(`Error seeding data: ${error}`));
}
