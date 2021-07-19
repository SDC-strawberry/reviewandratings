const help = require('./helpers.js')
require('dotenv').config();
const Pool = require('pg').Pool;
const pool = new Pool ({
  user: process.env.user,
  host: process.env.host,
  database: process.env.database,
  password: process.env.password,
  port: process.env.port
});

//obtains multiple reviews for a single product
const getReviews = (req, res) => {
  const getReviews = {
    text: 'SELECT r.product_id,r.id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, p.id, p.url FROM reviews AS r LEFT JOIN reviews_photos AS p ON r.id = p.review_id WHERE r.product_id = $1 ORDER BY r.id ASC LIMIT $2',
    rowMode: 'array',
    values: [req.query.product_id, req.query.count || 5 ]
  }
  pool
    .query(getReviews)
    .then((results) => {
      let formatted = help.returnReviews(results.rows, req.query.product_id, req.query.page || 0, req.query.count || 5)
      res.send(formatted);
    })
    .catch((error) => {throw error});
}

//obtains metadata for a single product
const getMeta = (req, res) => {
  const getMeta = {
    text: 'SELECT c.id, c.name, cr.value, cr.review_id, r.rating, r.recommend, c.product_id FROM characteristics AS c LEFT JOIN characteristic_reviews AS cr ON c.id = cr.characteristic_id LEFT JOIN reviews AS r ON r.id = cr.review_id WHERE c.product_id = $1',
    // rowMode: 'array',
    values: [req.query.product_id]
  }
  pool
    .query(getMeta)
    .then((results) => {
      let formatted = help.returnMeta(results.rows, req.query.product_id)
      res.send(formatted);
    })
    .catch((error) => {throw error});
}



module.exports = {
  getReviews,
  getMeta

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