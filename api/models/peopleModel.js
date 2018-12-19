'use strict';
var mongoose = require('mongoose');
//var ObjectId = mongoose.Schema.Types.ObjectId;
var Contact = require('Contact');
var Schema = mongoose.Schema;
var peopleSchema = new Schema({
   name: {
      type: String
   },
   Contacts: {
      type: [Contact]
   }
});
module.exports = mongoose.model('People', peopleSchema);