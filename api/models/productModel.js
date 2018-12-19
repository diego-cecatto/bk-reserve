'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Decimal =  Schema.Types.Decimal128;
var productSchema = new Schema({
   nome: {
      type: String
   },
   value: {
      type: Decimal
   },
   stock : {
      type: Number
   }
});
module.exports = mongoose.model('Product', productSchema);