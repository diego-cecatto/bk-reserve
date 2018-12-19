'use strict';
module.exports = function(app) {
var reserve = require('../controllers/reserveController');
// reserve Routes
app.route('/reserve')
   .get(reserve.listAll)
   .post(reserve.create);
app.route('/reserve/:id')
   .get(reserve.read)
   .put(reserve.update)
   .delete(reserve.delete);
};
