const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author_name;
  released;

  constructor({ id, title, author_name, released, authors }) {
    this.id = id;
    this.title = title;
    this.author_name = author_name;
    this.released = released;
    if (authors) this.authors = authors.length > 0 ? authors : [];
  }
  static async getAll() {
    const { rows } = await pool.query('select * from books');
    return rows.map((row) => new Book(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
      select
      books.title, books.released, 
      COALESCE(
        json_agg(to_jsonb(authors))
        FILTER (WHERE books_authors.id IS NOT NULL), '[]'
    ) as authors 
    from books
    LEFT JOIN books_authors on books.id = books_authors.book_id

    LEFT JOIN authors on authors.id = books_authors.author_id
    WHERE authors.id = $1
    GROUP BY books.id
    `,
      [id]
    );
    if (!rows[0]) return null;

    return new Book(rows[0]);
  }
  static async insert({ title, author_name, released }) {
    const { rows } = await pool.query(
      'insert into books (title, author_name, released) values ($1, $2, $3) returning *;',
      [title, author_name, released]
    );
    return new Book(rows[0]);
  }
};
