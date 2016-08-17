var express = require('express');
var router = express.Router();
var config = require('../../config');
var ManagementClient = require('auth0').ManagementClient;

var management = new ManagementClient({
  token: config.auth0_read_users,
  domain: config.auth0_domain
});

// Get users
router.get('/:user_id', function(req, res, next) {
  console.log(req.params);
  management.users.get({"id": req.params.user_id})
    .then((user) => {
      return res.json({
        "name": user.name,
        "nickname": user.nickname
      });
    })
    .catch(next);
});

module.exports = router;
