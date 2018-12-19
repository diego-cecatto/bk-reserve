'use strict';
var mongoose = require('mongoose'),
    Contact = mongoose.model('Contact');
exports.listAll = function(req, res) {
   Contact.find({}, function(err, ctc) {
      if (err) {
         res.send(err);
      }
      res.json(ctc);
   });
};
exports.create = function(req, res) {
   var contact = new Contact(req.body);
   contact.save(function(err, ctc) {
      if (err) {
         res.send(err);
      }
      res.json(ctc);
   });
};
exports.read = function(req, res) {
   Contact.findById(req.params.id, function(err, ctc) {
      if (err) {
         res.send(err);
      }
      res.json(ctc);
   });
};
exports.update = function(req, res) {
   Contact.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, ctc) {
      if (err) {
         res.send(err);
      }
      res.json(ctc);
   });
};
exports.delete = function(req, res) {
   Contact.remove({
      _id: req.params.id
   }, function(err, ctc) {
      if (err) {
         res.send(err);
      }
      res.json({ message: 'Contact successfully deleted' });
   });
};