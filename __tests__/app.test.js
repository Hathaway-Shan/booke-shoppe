const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('backend-express-template routes', () => {
  beforeEach(() => {
    return setup(pool);
  });
  it('/books should return a list of books', async () => {
    const res = await request(app).get('/books');
    expect(res.body.length).toEqual(5);
  });
  it('/authors should return a list of authors', async () => {
    const res = await request(app).get('/authors');
    expect(res.body.length).toEqual(3);
  });
  it('/books/:id returns a single book and author info', async () => {
    const res = await request(app).get('/books/1');
    const book1 = {
      id: '1',
      title: 'Eat Pray Love',
      author_name: 'Elizabeth Gilbert',
      released: '2006',
    };
    expect(res.body).toEqual(book1);
  });
});
afterAll(() => {
  pool.end();
});
