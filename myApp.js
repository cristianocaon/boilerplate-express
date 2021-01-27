var express = require('express');
var app = express();
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




























module.exports = app;
