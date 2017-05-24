const express = require('express');
const bodyParser = require('body-parser')
const app = express();
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send("Hello Etna's");
});

app.post('/testpost', function (req, res) {
    console.log(req.body.test);
    console.log(req.body.test2)
    res.json({ message: 'hooray! welcome to our api!' });
});

app.get('/crimes/getAllCrimes', function (req, res) {
    //todo
    res.json({data: "ici result de mongodb"});
});


app.listen(3001, function () {
    console.log('Example app listening on port 3001!');
});