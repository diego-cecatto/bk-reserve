'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var contactSchema = new Schema({
   phoneNumber: {
      type: String
   }
});
module.exports = mongoose.model('Contact', contactSchema);