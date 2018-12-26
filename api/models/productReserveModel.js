'use strict';
var mongoose = require('mongoose');
var Product = mongoose.model('Product');
// var Int32 = require('mongoose-int32');
var ObjectId = mongoose.Schema.Types.ObjectId;
var Schema = mongoose.Schema;
var Decimal = Schema.Types.Decimal;
var productResereveSchema = new Schema({
   description: {
      type: String
   },
   quantity: {
      type: Number
   },
   value: {
      type: Decimal
   },
   product : {
      type :ObjectId
       , 
       ref :Product
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