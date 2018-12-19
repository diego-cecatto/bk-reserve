'use strict';
var mongoose = require('mongoose'),
    Status = mongoose.model('Status');
exports.listAll = function(req, res) {
   Status.find({}, function(err, sts) {
      if (err) {
         res.send(err);
      }
      res.json(sts);
   });
};
exports.create = function(req, res) {
   var status = new Status(req.body);
   status.save(function(err, sts) {
      if (err) {
         res.send(err);
      }
      res.json(sts);
   });
};
exports.read = function(req, res) {
   Status.findById(req.params.id, function(err, sts) {
      if (err) {
         res.send(err);
      }
      res.json(sts);
   });
};
exports.update = function(req, res) {
   Status.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, sts) {
      if (err) {
         res.send(err);
      }
      res.json(sts);
   });
};
exports.delete = function(req, res) {
   Status.remove({
      _id: req.params.id
   }, function(err, sts) {
      if (err) {
         res.send(err);
      }
      res.json({ message: 'Contact successfully deleted' });
   });
};