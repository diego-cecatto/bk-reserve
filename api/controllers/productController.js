'use strict';
var mongoose = require('mongoose'),
    Product = mongoose.model('Product');
exports.listAll = function(req, res) {
   Product.find({}, function(err, prod) {
      if (err) {
         res.send(err);
      }
      res.json(prod);
   });
};
exports.listWithStock = function(req, res) {
   Product.find({stock: {$gte : 18 }}, function(err, prod) {
      if (err) {
         res.send(err);
      }
      res.json(prod);
   });
};

exports.create = function(req, res) {
   var product = new Product(req.body);
   product.save(function(err, prod) {
      if (err) {
         res.send(err);
      }
      res.json(prod);
   });
};
exports.read = function(req, res) {
   Product.findById(req.params.id, function(err, prod) {
      if (err) {
         res.send(err);
      }
      res.json(prod);
   });
};
exports.update = function(req, res) {
   Product.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, prod) {
      if (err) {
         res.send(err);
      }
      res.json(prod);
   });
};
exports.delete = function(req, res) {
   Product.remove({
      _id: req.params.id
   }, function(err, prod) {
      if (err) {
         res.send(err);
      }
      res.json({ message: 'Product successfully deleted' });
   });
};