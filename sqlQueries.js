const Pool = require('pg').Pool;
const pool = new Pool ({
  user: 'me',
  host: 'localhost',
  database: 'test',
  password: 'dollar',
  port: 5432
});


const getUsers = (req, res) => {
  pool
    .query('SELECT * FROM users ORDER BY id DESC')
    .then((results) => {res.status(200).json(results.rows)})
    .catch((error) => {throw error});
}

module.exports = {
  getUsers
}


// pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//   if (error) {
//     throw error
//   }
//   res.status(200).json(results.rows)
// })