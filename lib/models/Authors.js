const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor({ id, name, dob, pob, books }) {
    this.id = id;
    this.name = name;
    this.dob = dob;
    this.pob = pob;
    if (books) this.books = books.length > 0 ? books : [];
  }
  static async getAll() {
    const { rows } = await pool.query('select * from authors');
    return rows.map((row) => new Author(row));
  }
  static async getById(id) {
    const { rows } = await pool.query(
      `
      select
      authors.*, 
      COALESCE(
        json_agg(to_jsonb(books))
        FILTER (WHERE books_authors.id IS NOT NULL), '[]'
    ) as books 
    from authors
    LEFT JOIN books_authors on authors.id = books_authors.author_id

    LEFT JOIN books on books.id = books_authors.book_id
    WHERE authors.id = $1
    GROUP BY authors.id
    `,
      [id]
    );
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }
};
