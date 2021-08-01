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

//======================================================
//obtains multiple reviews for a single product
const getReviews = (req, res) => {

  const getReviews = {
    text: 'SELECT r.product_id,r.id, r.rating, r.summary, r.recommend, r.response, r.body, r.date, r.reviewer_name, r.helpfulness, p.id, p.url FROM reviews AS r LEFT JOIN reviews_photos AS p ON r.id = p.review_id WHERE r.product_id = $1 AND r.reported = false ORDER BY r.id ASC LIMIT $2',
    rowMode: 'array',
    values: [req.query.product_id, req.query.count || 5 ]
  }
  if (!req.query.product_id) {
    res.send("Error: invalid product_id provided");
    return;
  }
  pool
    .query(getReviews)
    .then((results) => {
      let formatted = help.returnReviews(results.rows, req.query.product_id, req.query.page || 0, req.query.count || 5)
      res.send(formatted);
    })
    .catch((error) => {throw error});
}

//======================================================
//obtains metadata for a single product
const getMeta = (req, res) => {
  const getMeta = {
    text: 'SELECT c.id, c.name, cr.value, cr.review_id, r.rating, r.recommend, c.product_id FROM characteristics AS c LEFT JOIN characteristic_reviews AS cr ON c.id = cr.characteristic_id LEFT JOIN reviews AS r ON r.id = cr.review_id WHERE c.product_id = $1',
    values: [req.query.product_id]
  }
  if (!req.query.product_id) {
    res.send("Error: invalid product_id provided");
    return;
  }
  pool
    .query(getMeta)
    .then((results) => {
      let formatted = help.returnMeta(results.rows, req.query.product_id)
      res.send(formatted);
    })
    .catch((error) => {throw error});
}

//======================================================
//adds a + 1 to a helpfulness score for a single product
const helpful = (req, res) => {
  const helpful = {
    text: 'UPDATE reviews SET helpfulness = helpfulness + 1 WHERE reviews.id = $1;',
    // rowMode: 'array',
    values: [req.query.review_id]
  }
  pool
    .query(helpful)
    .then((results) => {
      res.sendStatus(204);
    })
    .catch((error) => {throw error});
}

//======================================================
//flags a review as reported and removes it from returned data for a single product
const report= (req, res) => {
  const report = {
    text: 'UPDATE reviews SET reported = true WHERE reviews.id = $1;',
    // rowMode: 'array',
    values: [req.query.review_id]
  }
  pool
    .query(report)
    .then((results) => {
      res.sendStatus(204);
    })
    .catch((error) => {throw error});
}

//======================================================
//saves a review for a single product

const postReview = (req, res) => {
  //need to clean up the date
  const newReview = {
    text: 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)VALUES ($1, $2, DEFAULT, $3, $4, $5, false, $6, $7, null, 0 ) RETURNING id',
    // rowMode: 'array',
    values: [req.body.product_id, req.body.ratings, req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email ]
  }
  pool
    .query(newReview)
    .then((results) => {
      const review_id = results.rows[0].id;
      //do a for loop with the query inside?
      if (req.body.photos.length) {
        req.body.photos.forEach(async (item) => {
          await pool.query(`INSERT INTO reviews_photos (review_id, url) VALUES (${review_id}, '${item}')`)
        })
      }
      return results
    })
    .then( async (results) => {
      const characteristics = req.body.characteristics;
      const review_id = results.rows[0].id;
      // console.log('results: ', results.rows[0].id);
      //I passed the review ID
      //create a char reviews record with the review_id, value and key of the char

      for (let key in characteristics) {
        await pool.query(`INSERT INTO characteristic_reviews (characteristic_id, review_id, value) VALUES (${key}, ${review_id}, '${characteristics[key]}')`)
      }

    })
    .catch((error) => {throw error});
}

module.exports = {
  getReviews,
  getMeta,
  helpful,
  report,
  postReview

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
  // console.log('POST Info: ', req.body)
  // const newReview = {
  //   text: 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness)VALUES ($1, $2, DEFAULT, $3, $4, $5, false, $6, $7, null, 0 ) RETURNING id',
  //   // rowMode: 'array',
  //   values: [req.body.product_id, req.body.ratings, req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email ]
  // }

  // pool
  //   .query(newReview)
  //   .then((results) => {
  //     review_id = results.rows[0];
  //     //do a for loop with the query inside?
  //   })
  //   .query(test)
  //   .catch((error) => {throw error});


//tried from node-postgres documentation - need to break it down for arrays and the chars
//   const client = await pool.connect()

//   try {
//     await client.query('BEGIN')
//     const queryText = 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES ($1, $2, DEFAULT, $3, $4, $5, false, $6, $7, null, 0 ) RETURNING id'
//     const queryValues = [req.body.product_id, req.body.ratings, req.body.summary, req.body.body, req.body.recommend, req.body.name, req.body.email]
//     const res = await client.query(queryText, queryValues)

//     // const insertPhotoText = 'INSERT INTO reviews_photos (review_id, url) VALUES ($1, $2)'
//     // const insertPhotoValue = [res.rows[0].id, req.body.photos]
//     // await client.query(insertPhotoText, insertPhotoValue)
//     if (req.body.photos.length) {
//       await photoPost(res.rows[0].id, req.body.photos)
//     }


//     await client.query('COMMIT')
//   } catch (e) {
//     await client.query('ROLLBACK')
//     throw e
//   } finally {
//     client.release()
//   }
// })().catch((e) => console.error(e.stack))
// res.sendStatus(204)



// (async () => {
//   let review_id;
//   try {
//     review_id = await getPostReviewId(req);
//   } catch (error) {throw error};

//   if (req.body.photos.length) {
//     try{
//       await photoPost(review_id, req.body.photos)
//     } catch (error) {
//       console.log("happening at photos:", error);
//     };
//   }

// })()
// .catch((e) => console.error(e.stack))