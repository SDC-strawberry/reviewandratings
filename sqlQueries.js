require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool ({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
});


const getUsers = (req, res) => {
  pool
    .query('SELECT date FROM reviews WHERE id = 200001')
    .then((results) => console.log(typeof results.rows[0].date))
    .catch((error) => {throw error});
}




module.exports = {
  getUsers,

}


// pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//   if (error) {
//     throw error
//   }
//   res.status(200).json(results.rows)
// })

// const getUsers = (req, res) => {
//   pool
//     .query('SELECT date FROM reviews WHERE id = 200001')
//     .then((results) => {res.status(200).json(results.rows)})
//     .catch((error) => {throw error});
// }