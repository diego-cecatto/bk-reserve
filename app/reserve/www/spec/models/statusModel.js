'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var statusSchema = new Schema({
   nome: {
      type: String
   }
});
module.exports = mongoose.model('Status', statusSchema);