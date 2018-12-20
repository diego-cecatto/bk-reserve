'use strict';
var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;
var Contact = require('Contact');
var Schema = mongoose.Schema;
var clientSchema = new Schema({
   name: {
      type: String
   },
   contacts: {
      type: [Contact]
   }
});
module.exports = mongoose.model('Client', clientSchema);