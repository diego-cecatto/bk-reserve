'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ObjectId = mongoose.Schema.Types.ObjectId;
var People = require('People');
var Status = require('Status');
var ProductReserve = require('ProductReserve');
var reserveSchema = new Schema({
   people: {
      type: People
   },
   status: {
      type: Status
   },
   details: {
      type: String
   },
   deliveryDate: {
      type: Date
   },
   deliveredDate: {
      type: Date
   },
   productsReserves: {
      type : [ProductReserve]
   }
});
module.exports = mongoose.model('Reserve', reserveSchema);