const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
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

app.get('/loaderio-f1a5d2f5aeb142031f5f900bfeca5575.txt', (req, res) => {
  var options = {
    root: path.join(__dirname)
  };
  const filename = 'loaderio-f1a5d2f5aeb142031f5f900bfeca5575.txt'
  res.sendFile(filename, options, (err) => {
    if (err) {
      console.log(err);
    }
    else {
      console.log("File sent!")
    }
  })
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

