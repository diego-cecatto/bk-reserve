'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ObjectId = mongoose.Schema.Types.ObjectId;
var Client = require('Client');
var Status = require('Status');
var ProductReserve = require('ProductReserve');
var reserveSchema = new Schema({
   client: {
      type: Client
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
   },
   row: {
      type : Number
   }
});
module.exports = mongoose.model('Reserve', reserveSchema);