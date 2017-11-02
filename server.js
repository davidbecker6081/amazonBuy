const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const db = require('knex')(configuration);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Amazon Bay';

app.listen(app.get('port'), () => {
	console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

app.get('/api/v1/inventory', (request, response) => {
	return db('inventory')
		.select()
		.then(items => {
			if (!items.length) {
				return response.status(404).json({ error: 'No items could be found.' });
			} else {
				return response.status(200).json(items);
			}
		})
		.catch(error => response.status(500).json({ error }));
});


app.get('/api/v1/order_history', (request, response) => {
  return db('order_history')
    .select()
    .then(history => {
      if (!history.length) {
        return response.status(404).json({ error: 'No order history could be found.' });
      } else {
        return response.status(200).json(history);
      }
    })
    .catch(error => response.status(500).json({ error }));
})

app.post('/api/v1/order_history', (request, response) => {
  const order = request.body;
  const requiredKeys = ['total'];

  for (const requiredParameter of requiredKeys) {
    if (!order[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: {'total': <decimal>}. You are missing a ${requiredParameter} property.`
      });
    };
  };

  return db('order_history')
    .insert(order, '*')
    .then(postedOrder => response.status(201).json(postedOrder))
    .catch(error => response.status(500).json({ error }));
})

module.exports = app;
