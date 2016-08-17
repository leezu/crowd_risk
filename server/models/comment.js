var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

var CommentSchema = new mongoose.Schema({
  report_id: String,
  user: String,
  text: String
});
CommentSchema.index({report_id: 1});

module.exports = mongoose.model('Comment', CommentSchema);
