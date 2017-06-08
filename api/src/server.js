//Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Init
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Init mongodb
// mongoose.connect('mongodb://mongo:27017/mean');
// var db = mongoose.connection;

// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function callback(){
//    console.log("Connection with database succeeded");
// });

mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://mongo:27017/mean', {server: { poolSize: 5 }});
var conn = mongoose.connection;

conn.once('open', function ()
{
    console.log('Connection with database succeeded');
});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-token, Content-Type, Accept");
  next();
});

//Import routes
require('./routes/crimesRoutes')(app);
require('./routes/authRoutes')(app);
require('./routes/usersRoutes')(app);

app.get('/', function(req, res) {
    res.send("Hello Etna's");
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});