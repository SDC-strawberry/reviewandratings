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

app.get('/users', db.getUsers)



app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});

