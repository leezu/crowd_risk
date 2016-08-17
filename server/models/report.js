var mongoose = require('mongoose');
// set Promise provider to bluebird
mongoose.Promise = require('bluebird');

var ReportSchema = new mongoose.Schema({
  user: String,
  title: String,
  description: String,
  category: String,
  base64Image: String,
  location : {
    type: {
      type: String,
      default: 'Point'
    },
    // MongoDB requires order longitude, latitude (!)
    coordinates: [Number]
  }
});
ReportSchema.index({location: '2dsphere'});

module.exports = mongoose.model('Report', ReportSchema);
