'use strict';
module.exports = function(app) {
var people = require('../controllers/peopleController');
// people Routes
app.route('/people')
   .get(people.listAll)
   .post(people.create);
app.route('/people/:id')
   .get(people.read)
   .put(people.update)
   .delete(people.delete);
};
