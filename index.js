const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const db = require('./sqlQueries');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) => {
  res.send('connected')
});

app.get('/reviews', db.getReviews)

app.get('/reviews/meta', db.getMeta)

app.put('/reviews/helpful', db.helpful)

app.put('/reviews/report', db.report)

app.post('/reviews/post', db.postReview)




app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

