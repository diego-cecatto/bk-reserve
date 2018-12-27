'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var Client = mongoose.model('Client');
var Status = mongoose.model('Status');
var ProductReserve = mongoose.model('ProductReserve');
var reserveSchema = new Schema({
   client: {
      type: ObjectId 
      , 
      ref:Client 
   },
   status: {
      type: ObjectId
      ,
      ref: Status
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
   productsReserves: [{
      type : ObjectId 
      ,
      ref : ProductReserve
   }],
   row: {
      type : Number
   }
});
module.exports = mongoose.model('Reserve', reserveSchema);