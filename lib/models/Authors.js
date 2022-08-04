const pool = require('../utils/pool');

module.exports = class Author {
  id;
  name;
  dob;
  pob;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.dob = row.dob;
    this.pob = row.pob;
  }
  static async getAll() {
    const { rows } = await pool.query('select * from authors');
    return rows.map((row) => new Author(row));
  }
  static async getById(id) {
    const { rows } = await pool.query('select * from authors where id=$1;', [
      id,
    ]);
    if (!rows[0]) return null;
    return new Author(rows[0]);
  }
};
