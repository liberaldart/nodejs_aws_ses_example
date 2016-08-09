var express = require('express');

var fs = require('fs');
var obj;

var fs = require('fs');
var obj = fs.readFileSync("aws_config.property", "utf8").replace(/(\r\n|\n|\r)/gm,"");
console.log(obj);


if(obj) {
  console.log(JSON.stringify(obj));
}
else{
  console.log("Error reading aws property");
}

var app = express();
var bodyParser = require('body-parser')
    //Allow CORS on this server
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(function(req, res, next) {
    console.log(req.body) // populated!
    next()
})



var path = require('path');



var ses = require('node-ses'),
    client = ses.createClient(JSON.parse(obj));
    //client = ses.createClient(JSON.parse(obj));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/sendEmail', function(req, res) {
    // Give SES the details and let it construct the message for you.

    var Otp = Math.floor(100 * Math.random()) + "" +
              Math.floor(100 * Math.random()) + "" + Math.floor(100 * Math.random()) + "" + Math.floor(100 * Math.random()) +
              "" + Math.floor(100 * Math.random());
    req.body.message += Otp;
    if (req.body.html == true) {
        client.sendEmail(req.body, function(err, data, res) {
            // ...
            if (err) {
                console.log(err);
            }

            console.log(res.status);
            result = res.status;
        });

    }


    res.send({"otp":Otp});
});

//app.use('/assets', express.static(path.join(__dirname, '/assets')));

//start the server
app.listen(8180, function() {
    console.log('Example app listening on port 8180!');
});
