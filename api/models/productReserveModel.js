'use strict';
var mongoose = require('mongoose');
var Product = require('Product');
var Reserve = require('Reserve');

// var Int32 = require('mongoose-int32');
// var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;
var productResereveSchema = new Schema({
   description: {
      type: String
   },
   quantity: {
      type: Number
   },
   product: {
      type: Product
   }
   // ,
   // Reserve: {
   //    type: Reserve
   // }
   // ,
   // idItem: {
   //    type: ObjectId
   // },
   // idReserva: {
   //    type: ObjectId
   // }
});
module.exports = mongoose.model('ProductReserve', productResereveSchema);