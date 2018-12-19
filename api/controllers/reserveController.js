'use strict';
var mongoose = require('mongoose'),
    Reserve = mongoose.model('Reserve'),
    Status = mongoose.model('Status');
exports.listAll = function(req, res) {
   Reserve.find({}, function(err, rsv) {
      if (err) {
         res.send(err);
      }
      res.json(rsv);
   });
};
exports.listAllPendings = function(req, res) {
   Status.find({ description : "Active" }, function(err,stat) {
      Reserve.find( { status: stat.id }, function(err, rsv) {
         if (err) {
            res.send(err);
         }
         res.json(rsv);
      });
   });
};
exports.create = function(req, res) {
   var reserve = new Reserve(req.body);
   reserve.save(function(err, rsv) {
      if (err) {
         res.send(err);
      }
      res.json(rsv);
   });
};
exports.read = function(req, res) {
   Reserve.findById(req.params.id, function(err, rsv) {
      if (err) {
         res.send(err);
      }
      res.json(rsv);
   });
};
exports.update = function(req, res) {
   Reserve.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, rsv) {
      if (err) {
         res.send(err);
      }
      res.json(rsv);
   });
};
exports.delete = function(req, res) {
   Reserve.remove({
      _id: req.params.id
   }, function(err, rsv) {
      if (err) {
         res.send(err);
      }
      res.json({ message: 'Reserve successfully deleted' });
   });
};