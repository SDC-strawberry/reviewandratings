const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./sqlQueries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.json("hey")
});

app.get('/reviews', db.getReviews)
//need help to better understand paginate - talk with tom


app.get('/reviews/meta', db.getMeta)

// app.post('/reviews/post', db.getUsers)

// app.put('/reviews/helpful', db.getUsers)

// app.put('/reviews/report', db.getUsers)



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

