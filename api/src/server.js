const express = require('express');
const app = express();

app.get('/', function(req, res) {
  res.send("Hello Etna's");
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});