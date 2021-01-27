let express = require('express');
let bodyParser = require('body-parser');
let app = express();
require('dotenv').config({ path: __dirname + '/.env' });

app.use(express.static(__dirname + '/public'));
app.use('/assets', express.static(__dirname + '/public'));

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.get('/', (req, res) => {
  absolutePath = __dirname + '/views/index.html';
  res.sendFile(absolutePath);
})

app.get('/json', (req, res) => {
  let response = "Hello json";
  if (process.env.MESSAGE_STYLE === 'uppercase') {
    response = response.toUpperCase();
  }
  res.json({
    "message": response
  });
})

const addCurrentTime = (req, res, next) => {
  req.time = new Date().toString();
  next();
}

app.get('/now', addCurrentTime, (req, res) => {
  res.json({
    "time": req.time
  });
})

app.get('/:word/echo', (req, res) => {
  res.json({
    "echo": req.params.word
  });
})

app.get('/name', (req, res) => {
  res.json({
    "name": req.query.first + " " + req.query.last
  });
})

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/name', (req, res) => {
  let reqName = req.body.first + " " + req.body.last;
  res.json({
    "name": reqName
  });
})
























module.exports = app;
