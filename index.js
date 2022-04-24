const path = require('path')
const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const cors = require('cors')
const conn = require('./services/init')

app.use(express.json())
app.use(express.urlencoded({
  extended: true
}))

const userRoute = require('./routes/user')
const recipeRoute = require('./routes/recipes')
const actvityRoute = require('./routes/activity')

app.use(bodyParser.json())
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
  allowedHeaders: '*'
}));

app.use('/user', userRoute);
app.use('/recipes', recipeRoute);
app.use('/activity', actvityRoute);

app.get('*', function (req, res) {
  res.sendFile('index.html', {
    root: path.join(__dirname, '/frontend/build/')
  });
});

app.listen(port, () => {
  conn.init();
  console.log(`Example app listening at http://0.0.0.0:${port}`);
});