const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const db = require('knex')(configuration);

chai.use(chaiHttp);


describe('test', () => {
	it('should run tests', () => {
		let ran = true;
		ran.should.equal(true);
	});
});

describe('Client Routes', () => {
	it('should return the homepage with text', done => {
		chai
			.request(server)
			.get('/')
			.end((error, response) => {
				response.should.have.status(200);
				response.should.be.html;
				response.res.text.should.include('Amazon Bay');
				done();
			});
	});

	it("should return a 404 error if the path doesn't exist", done => {
		chai
			.request(server)
			.get('/wrong')
			.end((error, response) => {
				response.should.have.status(404);
				done();
			});
	});
});

describe('API routes', () => {
	beforeEach(done => {
		db.migrate
			.rollback()
			.then(() => db.migrate.latest())
			.then(() => done())
			.catch(error => error);
	});

	beforeEach(done => {
		db.seed
			.run()
			.then(() => {
				done();
			})
			.catch(error => {
				return error;
			});
	});

  describe('GET /api/v1/inventory', () => {
    it('should fetch all items in inventory', done => {
			chai
				.request(server)
				.get('/api/v1/inventory')
				.end((err, response) => {
					response.should.have.status(200);
					response.should.be.json;
					response.body.should.be.a('array');
					response.body.length.should.equal(5);
					response.body
						.filter(item => item.item === 'Fodera Emperor Standard')
						.length.should.equal(1);
          response.body[0].should.have.property('id');
					response.body[0].id.should.be.a('number');
					response.body[0].should.have.property('item');
					response.body[0].item.should.be.a('string');
					response.body[0].should.have.property('price');
					response.body[0].price.should.be.a('number');
					response.body[0].should.have.property('item_description');
					response.body[0].item_description.should.be.a('string');
					response.body[0].should.have.property('item_url');
					response.body[0].item_url.should.be.a('string');
					response.body[0].should.have.property('created_at');
					response.body[0].created_at.should.be.a('string');
					response.body[0].should.have.property('updated_at');
					response.body[0].updated_at.should.be.a('string');
					done();
				});
		});
  })

  it('should return a 404 if no inventory was found', done => {
			chai
				.request(server)
				.get('/api/v1/wrong')
				.end((err, response) => {
					response.should.have.status(404);
					done();
				});
		});

});
