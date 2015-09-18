var express = require('express');
var bodyParser   = require('body-parser');
var app = express();

app.set('view engine', 'ejs'); // set up ejs for templating

app.use("/save/*", bodyParser.json());

app.post("/save/step1", require("./server/step1saveHandler"));

// respond with "hello world" when a GET request is made to the homepage
app.use(express.static('.'));


var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});