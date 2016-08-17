var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var Report = require('../../models/report');
var Comment = require('../../models/comment');
var config = require('../../config');

var authCheck = jwt({
  secret: new Buffer(config.jwt_secret, 'base64'),
  audience: config.jwt_id
});

// Get comments
router.get('/', function(req, res, next) {
  // use mongoose to get all comments in the database
  Comment.find(req.query)
    .exec()
    .then((comments) => {
      return res.json(comments);
    })
    .catch(next);
});

// update comment and send it back after creation
router.put('/:comment_id', authCheck, function(req, res, next) {
  Comment.findById(req.params.comment_id)
    .exec()
    .then((comment) => {
      if (req.user.sub != comment.user) {
        res.sendStatus(403);
        throw new Error("User not authorized.");
      }

      return comment.set({text : req.body.text});
    })
    .then((comment) => {
      return res.json(comment);
    })
    .catch(next);
});

// create comment and send it back after creation
router.post('/', authCheck, function(req, res, next) {
  Comment.create({
    user: req.user.sub,
    report_id : req.body.report_id,
    text : req.body.text
  })
    .then((comment) => {
      res.status(201);
      return res.json(comment);
    })
    .catch(next);
});

// delete a comment
router.delete('/:comment_id', authCheck, function(req, res, next) {
  Comment.findById(req.params.comment_id)
    .exec()
    .then((comment) => {
      if (req.user.sub != comment.user) {
        res.sendStatus('403');
        throw new Error("User not authorized.");
      }

      return Comment.remove({
        _id : req.params.comment_id
      });
    })
    .then((comment) => {
      res.sendStatus(200);
    })
    .catch(next);
});

module.exports = router;
