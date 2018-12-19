'use strict';
module.exports = function(app) {
var contact = require('../controllers/contactController');
// contact Routes
app.route('/contact')
   .get(contact.listAll)
   .post(contact.create);
app.route('/contact/:id')
   .get(contact.read)
   .put(contact.update)
   .delete(contact.delete);
};
