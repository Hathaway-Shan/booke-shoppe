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
      authors: [
        {
          id: 1,
          name: 'Elizabeth Gilbert',
          dob: 'July 18, 1969',
          pob: 'Waterbury, CT',
        },
      ],
    };
    expect(res.body).toEqual(book1);
    expect(res.body).toHaveProperty('authors');
  });
  it('/authors:id returns a single author info', async () => {
    const res = await request(app).get('/authors/3');
    const author3 = {
      id: '3',
      name: 'Plato',
      dob: '424 BC',
      pob: 'Athens, Greece',
      books: [
        {
          id: 5,
          title: 'The Republic',
          author_name: 'Plato',
          released: '375',
        },
      ],
    };
    expect(res.body).toEqual(author3);
    expect(res.body).toHaveProperty('books');
  });
  it('#post /authors adds new authors', async () => {
    const res = await request(app).post('/authors').send({
      name: 'Terry Pratchett',
      dob: 'April 28, 1948',
      pob: 'Beaconsfield, UK',
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      name: expect.any(String),
      dob: expect.any(String),
      pob: expect.any(String),
    });
  });
  it('#post /books adds new books', async () => {
    const res = await request(app).post('/books').send({
      title: 'Equal Rites',
      author_name: 'Terry Pratchett',
      released: 1987,
    });
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      id: expect.any(String),
      title: expect.any(String),
      author_name: expect.any(String),
      released: expect.any(String),
    });
  });
  afterAll(() => {
    pool.end();
  });
});
