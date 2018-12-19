'use strict';
var mongoose = require('mongoose'),
    People = mongoose.model('Contact');
exports.listAll = function(req, res) {
   People.find({}, function(err, plp) {
      if (err) {
         res.send(err);
      }
      res.json(plp);
   });
};
exports.create = function(req, res) {
   var people = new People(req.body);
   people.save(function(err, plp) {
      if (err) {
         res.send(err);
      }
      res.json(plp);
   });
};
exports.read = function(req, res) {
   People.findById(req.params.id, function(err, plp) {
      if (err) {
         res.send(err);
      }
      res.json(plp);
   });
};
exports.update = function(req, res) {
   People.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, plp) {
      if (err) {
         res.send(err);
      }
      res.json(plp);
   });
};
exports.delete = function(req, res) {
   People.remove({
      _id: req.params.id
   }, function(err, plp) {
      if (err) {
         res.send(err);
      }
      res.json({ message: 'Contact successfully deleted' });
   });
};