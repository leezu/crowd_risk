var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

var config = require('./config'); // get our config file

var app = express();

app.use(morgan('combined'));

var corsOptions = {
    origin: true,
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Origin, X-Requested-With, Content-Type, Accept, Authorization']
};
app.use(cors(corsOptions));

// for parsing application/json
app.use(bodyParser.json({
  limit:1024*1024*20,
  type:'application/json'
}));
// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true,
  limit:1024*1024*20,
  type:'application/x-www-form-urlencoding'
}));
app.use(methodOverride());

// Configuration
mongoose.connect(config.database);

app.use("/", require("./routes"));

app.listen(8080);
console.log('Listening on http://localhost:8080');
