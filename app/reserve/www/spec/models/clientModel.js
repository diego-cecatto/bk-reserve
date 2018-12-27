'use strict';
var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Contact = mongoose.model('Contact');
var Schema = mongoose.Schema;
var clientSchema = new Schema({
   name: {
      type: String
   },
   contacts: [{
      type: ObjectId 
      , 
      ref: Contact 
   }]
});
module.exports = mongoose.model('Client', clientSchema);