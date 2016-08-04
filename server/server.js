var express = require('express');
var mongoose = require('mongoose');
var jwt = require('express-jwt');
var cors = require('cors');
var morgan = require('morgan')

var config = require('./config'); // get our config file

var app = express();

app.use(morgan('combined'))
app.use(cors());

var authCheck = jwt({
    secret: new Buffer(config.jwt_secret, 'base64'),
    audience: config.jwt_id
});

// Configuration
mongoose.connect(config.database);

// Models
var Report = mongoose.model('Report', {
    title: String,
    description: String,
    category: String,
    image: String
});

// Get reports
app.get('/api/reports', function(req, res) {

    console.log("fetching reports");

    // use mongoose to get all reports in the database
    Report.find(function(err, reports) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(reports); // return all reports in JSON format
    });
});

// create report and send back all reports after creation
app.post('/api/reports', authCheck, function(req, res) {

    console.log("creating report");

    // create a report, information comes from AJAX request from Ionic
    Report.create({
        title : req.body.title,
        description : req.body.description,
        category: req.body.category,
        image: req.body.image,
        done : false
    }, function(err, report) {
        if (err)
            res.send(err);

        // get and return all the reports after you create another
        Report.find(function(err, reports) {
            if (err)
                res.send(err)
            res.json(reports);
        });
    });

});

// delete a report
app.delete('/api/reports/:report_id', authCheck, function(req, res) {
    Report.remove({
        _id : req.params.report_id
    }, function(err, report) {

    });
});

app.listen(8080);
console.log('Listening on http://localhost:8080');
