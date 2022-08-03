const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author_name;
  released;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author_name = row.author_name;
    this.released = row.released;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from books');
    return rows.map((row) => new Book(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('select * from books where id=$1;', [id]);
    if (!rows[0]) return null;

    return new Book(rows[0]);
  }
};
