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
  Report.find()
    .exec()
    .then((reports) => {
      return res.json(reports);
    })
    .catch(next);
});

// update report and send it back after creation
router.put('/:report_id', authCheck, function(req, res, next) {
  Report.findById(req.params.report_id)
    .exec()
    .then((report) => {
      if (req.user.sub != report.user) {
        res.sendStatus(403);
        throw new Error("User not authorized.");
      }

      return report.set({
        title : req.body.title,
        description : req.body.description,
        category: req.body.category,
        base64Image: req.body.base64Image,
        location: {
          coordinates: req.body.location.coordinates
        }
      });
    })
    .then((report) => {
      return res.json(report);
    })
    .catch(next);
});

// create report and send it back after creation
router.post('/', authCheck, function(req, res, next) {
  Report.create({
    user: req.user.sub,
    title : req.body.title,
    description : req.body.description,
    category: req.body.category,
    base64Image: req.body.base64Image,
    location: {
      coordinates: req.body.location.coordinates
    }
  })
    .then((report) => {
      res.status(201);
      return res.json(report);
    })
    .catch(next);
});

// delete a report
router.delete('/:report_id', authCheck, function(req, res, next) {
  Report.findById(req.params.report_id)
    .exec()
    .then((report) => {
      if (req.user.sub != report.user) {
        res.sendStatus('403');
        throw new Error("User not authorized.");
      }

      return Report.remove({
        _id : req.params.report_id
      });
    })
    .then((report) => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
