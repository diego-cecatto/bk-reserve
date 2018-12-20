'use strict';
var mongoose = require('mongoose'),
    Client = mongoose.model('Contact');
exports.listAll = function(req, res) {
   Client.find({}, function(err, cli) {
      if (err) {
         res.send(err);
      }
      res.json(cli);
   });
};
exports.create = function(req, res) {
   var client = new Client(req.body);
   client.save(function(err, cli) {
      if (err) {
         res.send(err);
      }
      res.json(cli);
   });
};
exports.read = function(req, res) {
   Client.findById(req.params.id, function(err, cli) {
      if (err) {
         res.send(err);
      }
      res.json(cli);
   });
};
exports.update = function(req, res) {
   Client.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, cli) {
      if (err) {
         res.send(err);
      }
      res.json(cli);
   });
};
exports.delete = function(req, res) {
   Client.remove({
      _id: req.params.id
   }, function(err, cli) {
      if (err) {
         res.send(err);
      }
      res.json({ message: 'Contact successfully deleted' });
   });
};