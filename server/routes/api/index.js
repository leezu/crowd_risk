var express = require('express');
var router = express.Router();

router.use("/reports", require("./reports"));
router.use("/comments", require("./comments"));
router.use("/users", require("./users"));

module.exports = router;
