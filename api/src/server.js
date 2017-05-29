//Import
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Init
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Init mongodb
mongoose.connect('mongodb://mongo:27017/mean');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback(){
   console.log("Connection with database succeeded");
});

//Import routes
require('./routes/crimesRoutes')(app);
require('./routes/authRoutes')(app);

app.get('/', function(req, res) {
    res.send("Hello Etna's");
});

app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});