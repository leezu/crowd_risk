var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var Report = require('../../models/report');
var config = require('../../config');

var authCheck = jwt({
  secret: new Buffer(config.jwt_secret, 'base64'),
  audience: config.jwt_id
});

// Get reports
router.get('/', function(req, res, next) {
  // use mongoose to get all reports in the database
  Report.find(function(err, reports) {

    // if there is an error retrieving, send the error.
    if (err)
      return next(err);

    return res.json(reports); // return all reports in JSON format
  });
});

// update report and send back all reports after creation
router.put('/', authCheck, function(req, res, next) {
  Report.findByIdAndUpdate(req.body._id,
                           req.body,
                           function (err, post) {
                             if (err) return next(err);
                             return res.json(post);}
                          );
});

// create report and send back all reports after creation
router.post('/', authCheck, function(req, res, next) {
  // create a report, information comes from AJAX request from Ionic
  Report.create({
    user: req.user.sub,
    title : req.body.title,
    description : req.body.description,
    category: req.body.category,
    base64Image: req.body.base64Image,
    location: {
      coordinates: req.body.location.coordinates
    }
  }, function(err, report) {
    if (err)
      return next(err);

    // get and return all the reports after you create another
    return Report.find(function(err, reports) {
      if (err)
        return next(err);

      return res.json(reports);
    });
  });
});

// delete a report
router.delete('/:report_id', authCheck, function(req, res, next) {
  Report.remove({
    _id : req.params.report_id
  }, function(err, report) {

  });
});

module.exports = router;
