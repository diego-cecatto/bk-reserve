'use strict';
module.exports = function(app) {
var client = require('../controllers/clientController');
// client Routes
app.route('/client')
   .get(client.listAll)
   .post(client.create);
app.route('/client/:id')
   .get(client.read)
   .put(client.update)
   .delete(client.delete);
};
