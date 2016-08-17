var express = require('express');
var router = express.Router();

router.use("/reports", require("./reports"));

module.exports = router;
