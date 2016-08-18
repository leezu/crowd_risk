var express = require('express');
var router = express.Router();
var config = require('../../config');
var Report = require('../../models/report');
var Comment = require('../../models/comment');
var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
  token: config.auth0_read_users,
  domain: config.auth0_domain
});

// Get users
router.get('/:user_id', function(req, res, next) {
  management.users.get({"id": req.params.user_id})
    .then((user) => {
      return res.json({
        "name": user.name,
        "nickname": user.nickname
      });
    })
    .catch(next);
});

// Count of reports per user
router.get('/:user_id/reports/count', function(req, res, next) {
  Report.count(req.query)
    .exec()
    .then((count) => {
      return res.json(count);
    })
    .catch(next);
});

// Count of comments per user
router.get('/:user_id/comments/count', function(req, res, next) {
  Comment.count(req.query)
    .exec()
    .then((count) => {
      return res.json(count);
    })
    .catch(next);
});

module.exports = router;
