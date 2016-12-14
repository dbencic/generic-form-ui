var express = require('express');
var bodyParser   = require('body-parser');
var app = express();

app.set('view engine', 'ejs'); // set up ejs for templating

app.use("/save/*", bodyParser.json());

app.post("/save/step1", require("./server/step1saveHandler"));

// respond with "hello world" when a GET request is made to the homepage
app.use(express.static('.'));

/** folowing block records errors with descriptors **/
app.use("/wizard/errorReport", bodyParser.urlencoded({
    extended: false
}));
app.post("/wizard/errorReport", (req, res)=>{
    var body = req.body;
    console.log("Error parsing wizard or wizard step: ", body.obtainedDescriptor);
    console.log("Url: ", body.url);
    console.log("requestData: ", body.requestData);
    console.log("Method: ", body.method);
    console.log("Error stack: ", body.stackTrace);
    res.end("accepted");
});
/** END folowing block records errors with descriptors **/

var server = app.listen(8000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});