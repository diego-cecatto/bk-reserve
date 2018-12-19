'use strict';
module.exports = function(app) {
var product = require('../controllers/productController');
// product Routes
app.route('/product')
   .get(product.listAll)
   .post(product.create);
app.route('/product/:id')
   .get(product.read)
   .put(product.update)
   .delete(product.delete);
};
